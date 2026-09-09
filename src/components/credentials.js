import Image from "next/image";

import { certificationContent, trainingCredentials } from "@/lib/portfolio";
import { Button, Icon, TOKENS } from "./portfolio-ui";

const credentials = [
  ...trainingCredentials,
  { ...certificationContent, date: certificationContent.issued },
];

export function Credentials() {
  return (
    <div className="mt-8 border-t border-white/10 pt-8 sm:mt-10">
      <h3 className={TOKENS.h3}>Certifications &amp; training</h3>
      <div className="mt-5 space-y-2.5">
        {credentials.map((credential) => (
          <details
            key={credential.title}
            name="credentials"
            className="group overflow-hidden rounded-2xl border border-white/12 bg-emerald-400/[0.035] transition duration-300 hover:border-sky-300/25 focus-within:border-sky-300/50"
          >
            <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300 sm:gap-4 [&::-webkit-details-marker]:hidden">
              <Image
                src={credential.image.src}
                alt=""
                width={56}
                height={42}
                className="h-10 w-14 flex-none rounded border border-white/10 object-contain"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-normal uppercase leading-5 tracking-[0.18em] text-orange-200/70 sm:text-[11px]">{credential.title}</span>
                <span className="mt-1 block text-sm font-normal leading-6 text-white/72">{credential.issuer} · {credential.date}</span>
              </span>
              <Icon name="arrow" className="h-4 w-4 flex-none rotate-90 text-emerald-200 transition-transform group-open:-rotate-90 motion-reduce:transition-none" />
            </summary>
            <div className="grid items-center border-t border-white/10 md:grid-cols-[1.15fr_0.85fr]">
              <a
                href={credential.pdf || credential.image.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${credential.title} certificate in a new tab`}
                className="block border-b border-white/10 bg-black p-3 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300 md:border-r md:border-b-0"
              >
                <Image
                  {...credential.image}
                  alt={`${credential.title} certificate awarded to John Rodriguez`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="mx-auto h-auto max-h-[26rem] w-full object-contain"
                />
              </a>
              <div className="p-5 sm:p-7 md:p-8">
                <h4 className="text-[10px] font-normal uppercase leading-5 tracking-[0.18em] text-orange-200/70 sm:text-[11px]">{credential.title}</h4>
                {credential.description ? <p className="mt-3 text-sm font-normal leading-6 text-white/72">{credential.description}</p> : null}
                <p className="mt-4 text-sm font-normal leading-6 text-white/72">Issued by {credential.issuer}<br />{credential.date}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {credential.href ? <Button href={credential.href} variant="secondary" aria-label={`Verify ${credential.title}`}>Verify credential <Icon name="arrow" className="h-4 w-4" /></Button> : null}
                  <Button href={credential.pdf || credential.image.src} variant="secondary" aria-label={`View ${credential.title} certificate`}>View certificate</Button>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
