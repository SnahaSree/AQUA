import { Mail, MessageSquare, ShieldCheck } from "lucide-react";

import { PublicPageHero } from "../components/PublicPageHero";
import { PageContainer } from "../components/PageContainer";
import { ContactForm } from "./components/ContactForm";

export function ContactPage() {
  return (
    <main>
      <PublicPageHero
        eyebrow="Let's talk"
        title="Bring environmental intelligence into your next decision."
        description="Whether you want to explore Aqua, discuss research, or talk about a potential deployment, send us a message."
      />

      <PageContainer>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <aside>
            <div className="space-y-8">
              <div>
                <Mail
                  className="text-sky-500"
                  size={25}
                  aria-hidden="true"
                />

                <h2 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">
                  Start a conversation
                </h2>

                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  Tell us what you are building, researching, or trying to
                  understand.
                </p>
              </div>

              <div>
                <MessageSquare
                  className="text-sky-500"
                  size={25}
                  aria-hidden="true"
                />

                <h2 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">
                  Clear communication
                </h2>

                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  We keep requests structured so conversations can move from
                  idea to action.
                </p>
              </div>

              <div>
                <ShieldCheck
                  className="text-sky-500"
                  size={25}
                  aria-hidden="true"
                />

                <h2 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">
                  Your information
                </h2>

                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  Contact submissions are handled through the secured Aqua
                  backend.
                </p>
              </div>
            </div>
          </aside>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900">
            <ContactForm />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}