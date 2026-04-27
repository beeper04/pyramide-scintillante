'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ententeSchema, EntenteFormData, PROVINCES_TERRITOIRES } from '@/types/entente'

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

const inputClass =
  'rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100'

const inputErrorClass =
  'rounded-md border border-red-400 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500'

export default function EntenteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<EntenteFormData>({
    resolver: zodResolver(ententeSchema),
    defaultValues: {
      province: 'QC',
    },
  })

  const onSubmit = async (data: EntenteFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log('Entente soumise :', data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {isSubmitSuccessful && (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          L&apos;entente a été créée avec succès.
        </div>
      )}

      {/* Section : Informations du partenaire */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-base font-semibold text-gray-900">
          Informations du partenaire
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField
              label="Nom de l'entreprise"
              required
              error={errors.nomEntreprise?.message}
            >
              <input
                {...register('nomEntreprise')}
                type="text"
                placeholder="Acme inc."
                className={errors.nomEntreprise ? inputErrorClass : inputClass}
              />
            </FormField>
          </div>

          <div className="sm:col-span-2">
            <FormField
              label="Adresse"
              required
              error={errors.adresse?.message}
            >
              <input
                {...register('adresse')}
                type="text"
                placeholder="123, rue Principale"
                className={errors.adresse ? inputErrorClass : inputClass}
              />
            </FormField>
          </div>

          <FormField label="Ville" required error={errors.ville?.message}>
            <input
              {...register('ville')}
              type="text"
              placeholder="Québec"
              className={errors.ville ? inputErrorClass : inputClass}
            />
          </FormField>

          <FormField
            label="Province"
            required
            error={errors.province?.message}
          >
            <select
              {...register('province')}
              className={errors.province ? inputErrorClass : inputClass}
            >
              <option value="">Sélectionner…</option>
              {PROVINCES_TERRITOIRES.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.nom}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            label="Code postal"
            required
            error={errors.codePostal?.message}
          >
            <input
              {...register('codePostal')}
              type="text"
              placeholder="G1R 2B5"
              maxLength={7}
              className={errors.codePostal ? inputErrorClass : inputClass}
            />
          </FormField>
        </div>
      </section>

      {/* Section : Représentant */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-base font-semibold text-gray-900">
          Représentant
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Nom complet"
            required
            error={errors.representant?.nom?.message}
          >
            <input
              {...register('representant.nom')}
              type="text"
              placeholder="Marie Tremblay"
              className={
                errors.representant?.nom ? inputErrorClass : inputClass
              }
            />
          </FormField>

          <FormField
            label="Poste"
            required
            error={errors.representant?.poste?.message}
          >
            <input
              {...register('representant.poste')}
              type="text"
              placeholder="Directrice marketing"
              className={
                errors.representant?.poste ? inputErrorClass : inputClass
              }
            />
          </FormField>

          <div className="sm:col-span-2">
            <FormField
              label="Courriel"
              required
              error={errors.representant?.courriel?.message}
            >
              <input
                {...register('representant.courriel')}
                type="email"
                placeholder="marie@acme.com"
                className={
                  errors.representant?.courriel ? inputErrorClass : inputClass
                }
              />
            </FormField>
          </div>
        </div>
      </section>

      {/* Section : Numéros de taxes */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-base font-semibold text-gray-900">
          Numéros de taxes
        </h2>
        <p className="mb-5 text-xs text-gray-500">Champs optionnels</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Numéro de TPS"
            error={errors.numeroTPS?.message}
          >
            <input
              {...register('numeroTPS')}
              type="text"
              placeholder="123456789 RT0001"
              className={errors.numeroTPS ? inputErrorClass : inputClass}
            />
          </FormField>

          <FormField
            label="Numéro de TVQ"
            error={errors.numeroTVQ?.message}
          >
            <input
              {...register('numeroTVQ')}
              type="text"
              placeholder="1234567890 TQ0001"
              className={errors.numeroTVQ ? inputErrorClass : inputClass}
            />
          </FormField>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          Réinitialiser
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60"
        >
          {isSubmitting ? 'Enregistrement…' : 'Créer l'entente'}
        </button>
      </div>
    </form>
  )
}
