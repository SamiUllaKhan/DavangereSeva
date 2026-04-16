import dbConnect from '../src/lib/mongodb';
import Part from '../src/models/Part';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const INITIAL_PARTS = [
  // LAPTOP PARTS - RAM
  { name: '8GB DDR4 RAM 3200MHz', brand: 'Crucial', category: 'Laptop', type: 'RAM', currentPrice: 1850 },
  { name: '16GB DDR4 RAM 3200MHz', brand: 'Kingston', category: 'Laptop', type: 'RAM', currentPrice: 3400 },
  { name: '8GB DDR5 RAM 4800MHz', brand: 'Samsung', category: 'Laptop', type: 'RAM', currentPrice: 2800 },
  { name: '4GB DDR3 RAM 1600MHz', brand: 'Hynix', category: 'Laptop', type: 'RAM', currentPrice: 950 },

  // LAPTOP PARTS - SSD
  { name: '256GB NVMe M.2 SSD', brand: 'WD Blue', category: 'Laptop', type: 'SSD', currentPrice: 2200 },
  { name: '512GB NVMe M.2 SSD', brand: 'Crucial P3', category: 'Laptop', type: 'SSD', currentPrice: 3800 },
  { name: '1TB NVMe M.2 SSD', brand: 'Samsung 980', category: 'Laptop', type: 'SSD', currentPrice: 7500 },
  { name: '512GB SATA 2.5" SSD', brand: 'Consistent', category: 'Laptop', type: 'SSD', currentPrice: 2600 },

  // LAPTOP PARTS - SCREENS
  { name: '15.6" Slim 30-Pin FHD Screen', brand: 'Multiple', category: 'Laptop', type: 'Screen', currentPrice: 4500 },
  { name: '14.0" Slim 30-Pin FHD Screen', brand: 'Multiple', category: 'Laptop', type: 'Screen', currentPrice: 4200 },
  { name: '15.6" Paper Slim 40-Pin Screen', brand: 'Multiple', category: 'Laptop', type: 'Screen', currentPrice: 5800 },

  // LAPTOP PARTS - BATTERIES
  { name: 'HP Pavilion Battery (TF03XL)', brand: 'HP', category: 'Laptop', type: 'Battery', currentPrice: 2400 },
  { name: 'Dell Inspiron Battery (WDX0R)', brand: 'Dell', category: 'Laptop', type: 'Battery', currentPrice: 2600 },
  { name: 'Lenovo ThinkPad Battery', brand: 'Lenovo', category: 'Laptop', type: 'Battery', currentPrice: 2800 },

  // PRINTER PARTS - TONERS
  { name: 'HP 12A Laser Toner', brand: 'HP', category: 'Printer', type: 'Toner', currentPrice: 650 },
  { name: 'HP 88A Laser Toner', brand: 'HP', category: 'Printer', type: 'Toner', currentPrice: 750 },
  { name: 'Canon 303 Toner', brand: 'Canon', category: 'Printer', type: 'Toner', currentPrice: 600 },
  { name: 'Brother TN-2365 Toner', brand: 'Brother', category: 'Printer', type: 'Toner', currentPrice: 850 },

  // PRINTER PARTS - CARTRIDGES & INK
  { name: 'HP 680 Black Ink Cartridge', brand: 'HP', category: 'Printer', type: 'Ink', currentPrice: 850 },
  { name: 'Canon GI-790 Black Ink Bottle', brand: 'Canon', category: 'Printer', type: 'Ink', currentPrice: 550 },
  { name: 'Epson 003 Black Ink Bottle', brand: 'Epson', category: 'Printer', type: 'Ink', currentPrice: 450 },

  // PRINTER SPARES
  { name: '12A/88A Pressure Roller', brand: 'Generic', category: 'Printer', type: 'Spare', currentPrice: 250 },
  { name: 'HP LaserJet Teflon Sleeve', brand: 'Generic', category: 'Printer', type: 'Spare', currentPrice: 180 },
  { name: 'Printer Pickup Roller Set', brand: 'Multiple', category: 'Printer', type: 'Spare', currentPrice: 350 },

  // DESKTOP PARTS
  { name: '450W SMPS Power Supply', brand: 'Consistent', category: 'Desktop', type: 'PSU', currentPrice: 850 },
  { name: 'H61 Motherboard', brand: 'Zebion', category: 'Desktop', type: 'Motherboard', currentPrice: 2800 },
  { name: 'G31 Motherboard', brand: 'Consistent', category: 'Desktop', type: 'Motherboard', currentPrice: 2400 },
  { name: 'GT 730 2GB Graphics Card', brand: 'Zotac', category: 'Desktop', type: 'GPU', currentPrice: 3800 },

  // CCTV PARTS
  { name: '1TB Surveillance HDD', brand: 'Seagate Skyhawk', category: 'CCTV', type: 'Storage', currentPrice: 4200 },
  { name: '2TB Surveillance HDD', brand: 'WD Purple', category: 'CCTV', type: 'Storage', currentPrice: 5800 },
  { name: '4-Channel 5A Power Supply', brand: 'CP Plus', category: 'CCTV', type: 'PSU', currentPrice: 450 },
  { name: 'BNC Connector (Steel)', brand: 'Multiple', category: 'CCTV', type: 'Connector', currentPrice: 25 },
];

async function seed() {
  await dbConnect();
  console.log('Connected to MongoDB');

  try {
    // Optional: Clear existing parts to avoid duplicates during testing
    // await Part.deleteMany({});
    
    for (const partData of INITIAL_PARTS) {
      const existing = await Part.findOne({ name: partData.name, brand: partData.brand });
      if (existing) {
        await Part.updateOne({ _id: existing._id }, partData);
        console.log(`Updated: ${partData.name} (${partData.brand})`);
      } else {
        await Part.create(partData);
        console.log(`Created: ${partData.name} (${partData.brand})`);
      }
    }

    console.log('Inventory seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding parts:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
