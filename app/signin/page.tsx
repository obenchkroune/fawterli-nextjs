import { SignInForm } from '@/components/dashboard/signin-form';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
	const session = await auth();
	if (session?.user) {
		return redirect('/dashboard');
	}
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
			<SignInForm />
		</div>
	);
}
