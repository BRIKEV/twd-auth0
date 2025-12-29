import { useLoaderData } from 'react-router';
import LoginButton from '../../components/LoginButton';
import LogoutButton from '../../components/LogoutButton';
import Profile from '../../components/Profile';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import type { loaderApp } from './loader';

function App() {
  const { user, isAuthenticated} = useLoaderData<typeof loaderApp>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="relative isolate mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <div className="absolute -left-10 top-12 h-56 w-56 rounded-full bg-cyan-500/25 blur-3xl" />
          <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="absolute bottom-16 left-12 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 shadow-inner shadow-white/10">
            TWD Auth0 Playground
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Auth0 login for TWD testing
            </h1>
            <p className="max-w-2xl text-lg text-slate-200/80">
              Validate the full Auth0 login/logout experience while you build. This page keeps the flow simple so you can focus on integrating with the tools you care about.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-200/80">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 shadow-sm shadow-white/10">Auth0</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 shadow-sm shadow-white/10">TWD-ready</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 shadow-sm shadow-white/10">Shadcn + Tailwind</span>
          </div>
        </div>

        <Card className="w-full max-w-xl justify-self-end border-white/15 bg-white/5 text-white shadow-xl shadow-slate-950/40 backdrop-blur">
          <CardHeader className="gap-2">
            <CardTitle className="flex items-center justify-between text-lg font-semibold">
              {isAuthenticated ? 'You are signed in' : 'Sign in to continue'}
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-100/80">Auth0 · TWD</span>
            </CardTitle>
            <CardDescription className="text-slate-200/80">
              Use your Auth0 account to explore the integration flow in this sandbox.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg border border-emerald-300/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-50">
                  <span className="grid size-9 place-items-center rounded-full border border-emerald-300/50 bg-emerald-500/20 text-lg">✅</span>
                  Successfully authenticated
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-white/5">
                  <div className="text-sm text-slate-200/70">Your profile</div>
                  <Profile name={user.name} email={user.email} picture={user.picture} />
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-sm text-slate-200/80">
                <p>Log in with Auth0 to try the full flow. Once signed in, you can inspect the user object and test protected areas.</p>
                <ul className="space-y-2 text-slate-200/70">
                  <li className="flex items-start gap-2"><span className="mt-0.5 text-cyan-200">•</span> Redirect-based login using your configured Auth0 app.</li>
                  <li className="flex items-start gap-2"><span className="mt-0.5 text-cyan-200">•</span> Session awareness via the Auth0 React SDK.</li>
                  <li className="flex items-start gap-2"><span className="mt-0.5 text-cyan-200">•</span> Quick logout to reset your tests.</li>
                </ul>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            <p className="w-full text-center text-xs text-slate-200/70">
              Safe to close once you are done testing.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default App;