import EntenteForm from '@/components/EntenteForm'

export default function NouvellEntentePage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Nouvelle entente de visibilité
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Remplissez les informations du partenaire pour créer une nouvelle entente.
        </p>
      </div>
      <EntenteForm />
    </div>
  )
}
