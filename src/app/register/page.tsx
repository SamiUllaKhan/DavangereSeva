import Link from 'next/link';
import { User, Hammer, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
    return (
        <div className="container px-4 py-20 mx-auto max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black tracking-tight text-primary uppercase mb-4">Join Davanagere Seva</h1>
                <p className="text-gray-500 text-lg">Choose how you want to use our platform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Customer Option */}
                <Card className="rounded-[40px] border-none shadow-xl hover:shadow-2xl transition-all group overflow-hidden">
                    <div className="bg-primary/5 h-32 flex items-center justify-center transition-colors group-hover:bg-primary/10">
                        <User size={64} className="text-primary" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">I am a Customer</CardTitle>
                        <CardDescription>Register to book services and track your requests in one place.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/register/customer">
                            <Button className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest flex justify-between px-8">
                                Register Now <ArrowRight size={20} />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Partner Option */}
                <Card className="rounded-[40px] border-none shadow-xl hover:shadow-2xl transition-all group overflow-hidden">
                    <div className="bg-orange-50 h-32 flex items-center justify-center transition-colors group-hover:bg-orange-100">
                        <Hammer size={64} className="text-orange-600" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">I am a Service Guy</CardTitle>
                        <CardDescription>Join our team of experts and start getting service requests in Davanagere.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/register/partner">
                            <Button variant="outline" className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest border-2 border-orange-600 text-orange-600 hover:bg-orange-50 flex justify-between px-8">
                                Join as Partner <ArrowRight size={20} />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <div className="text-center mt-12">
                <p className="text-gray-500">
                    Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
}
