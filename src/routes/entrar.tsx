import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Building2, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { Brand, DemoBadge } from "@/components/circular-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCircular } from "@/lib/circular-store";
import { profiles, type ProfileId } from "@/lib/demo-data";

export const Route = createFileRoute("/entrar")({
  head: () => ({ meta: [
    { title: "Entrar — CircularIA" },
    { name: "description", content: "Acesse a plataforma CircularIA ou entre com um perfil demonstrativo." },
    { property: "og:title", content: "Entrar — CircularIA" },
    { property: "og:description", content: "Acesso demonstrativo à plataforma de circularidade de baterias." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { setProfileId } = useCircular();
  const [notice, setNotice] = useState("");
  const enter = (id: ProfileId) => { setProfileId(id); void navigate({ to: "/dashboard" }); };
  return <main className="grid min-h-screen bg-muted lg:grid-cols-[.8fr_1.2fr]">
    <section className="hidden bg-foreground p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between"><Brand inverse /><div><p className="text-xs font-bold uppercase text-primary">Acesso seguro</p><h1 className="mt-4 text-4xl font-bold">Conectar. Otimizar. Aprender.</h1><p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/70">Entre para cadastrar ativos, negociar oportunidades e, quando contratado, acessar a inteligência geográfica da rede.</p></div><p className="text-xs text-primary-foreground/50">Protótipo conceitual · Dados demonstrativos</p></section>
    <section className="flex items-center justify-center p-5 md:p-10"><div className="w-full max-w-2xl rounded-lg border border-border bg-card p-6 md:p-8"><Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4"/>Voltar</Link><div className="flex items-start justify-between gap-3"><div><h1 className="text-3xl font-bold">Entrar</h1><p className="mt-2 text-sm text-muted-foreground">Use suas credenciais ou escolha um perfil para a demonstração.</p></div><DemoBadge /></div>
      <form className="mt-7 space-y-4" onSubmit={(e) => { e.preventDefault(); enter("ofertante"); }}><label className="block"><span className="mb-2 block text-sm font-semibold">E-mail</span><Input type="email" defaultValue="contato@empresa.demo" required /></label><label className="block"><span className="mb-2 block text-sm font-semibold">Senha</span><Input type="password" defaultValue="demonstracao" required /></label><div className="flex flex-wrap items-center justify-between gap-3"><Button type="button" variant="ghost" onClick={() => setNotice("Link de recuperação enviado. Simulação demonstrativa.")}>Esqueci minha senha</Button><Button type="submit"><KeyRound/>Entrar<ArrowRight/></Button></div>{notice && <p role="status" className="rounded-md bg-accent p-3 text-sm text-accent-foreground">{notice}</p>}</form>
      <div className="my-7 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border"/>Entrar como perfil de demonstração<span className="h-px flex-1 bg-border"/></div>
      <div className="grid gap-2 sm:grid-cols-2">{profiles.map((profile) => <Button key={profile.id} type="button" variant="outline" className="h-auto justify-start py-3 text-left" onClick={() => enter(profile.id)}>{profile.accountType === "PF" ? <UserRound/> : profile.id === "admin" ? <ShieldCheck/> : <Building2/>}<span><strong className="block">{profile.label}</strong><small className="font-normal text-muted-foreground">{profile.plans.intelligence ? "Intelligence ativo" : "Marketplace gratuito"}</small></span></Button>)}</div>
      <p className="mt-7 text-center text-sm text-muted-foreground">Ainda não possui acesso? <Link to="/criar-conta" className="font-bold text-primary">Criar conta</Link></p>
    </div></section>
  </main>;
}