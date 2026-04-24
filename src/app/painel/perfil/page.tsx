"use client";

import { Save, Camera } from "lucide-react";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";
import { useToast } from "@/components/painel/ToastProvider";

export default function PerfilPage() {
  const toast = useToast();
  return (
    <>
      <Topbar currentLabel="Meu perfil" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8 max-w-3xl">
        <PageHeader
          title="Meu perfil"
          description="Atualize seus dados pessoais, preferências e senha."
        />

        <div className="glass-card rounded-xl p-6 mb-4">
          <div className="flex items-center gap-5 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-primary to-green-dark flex items-center justify-center text-black text-xl font-bold">
                AM
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-green-primary flex items-center justify-center text-black">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h3 className="font-semibold">Alexandre Marin</h3>
              <p className="text-sm text-text-muted">Administrador</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-medium text-white/80 mb-1.5 block">Nome</span>
              <input defaultValue="Alexandre" className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-white/80 mb-1.5 block">Sobrenome</span>
              <input defaultValue="Marin" className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-white/80 mb-1.5 block">E-mail</span>
              <input defaultValue="alexandre@empresa.com" className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-white/80 mb-1.5 block">Telefone</span>
              <input defaultValue="+55 51 9 9999-9999" className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm" />
            </label>
            <label className="block md:col-span-2">
              <span className="text-xs font-medium text-white/80 mb-1.5 block">Bio</span>
              <textarea defaultValue="Atendimento comercial e contábil." className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm min-h-20" />
            </label>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 mb-4">
          <h3 className="font-semibold mb-4">Alterar senha</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-xs font-medium text-white/80 mb-1.5 block">Senha atual</span>
              <input type="password" className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-white/80 mb-1.5 block">Nova senha</span>
              <input type="password" className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-white/80 mb-1.5 block">Confirmar</span>
              <input type="password" className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm" />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => toast.success("Perfil atualizado", "Seus dados foram salvos.")}
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm"
          >
            <Save className="w-4 h-4" /> Salvar alterações
          </button>
        </div>
      </main>
    </>
  );
}
