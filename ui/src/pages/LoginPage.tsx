import { LoginForm } from '../features/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">ElectroShop</h1>
          <p className="mt-2 text-sm text-slate-500">Iniciá sesión para continuar</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
