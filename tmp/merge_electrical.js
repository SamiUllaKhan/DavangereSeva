const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://dvg_admin:Sami1504@cluster0.u8dri7r.mongodb.net/davanagere-seva?appName=Cluster0';

async function merge() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to Cluster0');

        // Identify categories
        const catSchema = new mongoose.Schema({ name: String, slug: String, brandLogos: [String] }, { strict: false });
        const Category = mongoose.models.Category || mongoose.model('Category', catSchema);

        const serSchema = new mongoose.Schema({ name: String, category: mongoose.Schema.Types.ObjectId, isActive: Boolean }, { strict: false });
        const Service = mongoose.models.Service || mongoose.model('Service', serSchema);

        const mainCat = await Category.findOne({ slug: 'electrical' });
        const oldCat = await Category.findOne({ slug: 'electrician' });

        if (!mainCat || !oldCat) {
            console.error('ERROR: Could not find both categories. Check slugs "electrical" and "electrician"');
            process.exit(1);
        }

        console.log('Main category found: ' + mainCat.name + ' (' + mainCat._id + ')');
        console.log('Old category found: ' + oldCat.name + ' (' + oldCat._id + ')');

        // Step 1: Move all services from old to main and set active
        const moveRes = await Service.updateMany(
            { category: oldCat._id },
            { $set: { category: mainCat._id, isActive: true } }
        );
        console.log('Moved ' + moveRes.modifiedCount + ' services to ' + mainCat.slug);

        // Step 2: Ensure any services WITHOUT category but with name/category relation are active
        const allSerRes = await Service.updateMany(
            { category: mainCat._id },
            { $set: { isActive: true } }
        );
        console.log('Activated all ' + allSerRes.modifiedCount + ' services for ' + mainCat.slug);

        // Step 3: Update brand logos for main
        const brands = [
            'https://logowik.com/content/uploads/images/havells8383.jpg',
            'https://logowik.com/content/uploads/images/legrand-electric3588.jpg',
            'https://logowik.com/content/uploads/images/schneider-electric5430.jpg',
            'https://logowik.com/content/uploads/images/finolex6497.jpg',
            'https://logowik.com/content/uploads/images/polycab9716.jpg',
            'https://logowik.com/content/uploads/images/l-t-construction-logo-for-tcs809.jpg'
        ];
        await Category.findByIdAndUpdate(mainCat._id, { 
            $set: { 
                brandLogos: brands, 
                name: 'Electrical Service',
                status: 'active'
            } 
        });
        console.log('Updated brand logos and name for Electrical Service');

        // Step 4: Delete the redundant category
        await Category.deleteOne({ _id: oldCat._id });
        console.log('Deleted redundant "electrician" category');

        process.exit(0);
    } catch (e) {
        console.error('Error during merge:', e);
        process.exit(1);
    }
}

merge();
