import { z } from 'zod'

export const representantSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  poste: z.string().min(1, 'Le poste est requis'),
  courriel: z.string().email('Veuillez entrer un courriel valide'),
})

export const ententeSchema = z.object({
  nomEntreprise: z.string().min(1, "Le nom de l'entreprise est requis"),
  adresse: z.string().min(1, "L'adresse est requise"),
  ville: z.string().min(1, 'La ville est requise'),
  province: z.string().min(1, 'La province est requise'),
  codePostal: z
    .string()
    .min(1, 'Le code postal est requis')
    .regex(
      /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
      'Format invalide (ex: G1R 2B5)'
    ),
  representant: representantSchema,
  numeroTPS: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{9}\s?[A-Z]{2}\d{4}$/i.test(val),
      'Format invalide (ex: 123456789 RT0001)'
    ),
  numeroTVQ: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{10}\s?TQ\d{4}$/i.test(val),
      'Format invalide (ex: 1234567890 TQ0001)'
    ),
})

export type EntenteFormData = z.infer<typeof ententeSchema>

export const PROVINCES_TERRITOIRES = [
  { code: 'QC', nom: 'Québec' },
  { code: 'ON', nom: 'Ontario' },
  { code: 'BC', nom: 'Colombie-Britannique' },
  { code: 'AB', nom: 'Alberta' },
  { code: 'MB', nom: 'Manitoba' },
  { code: 'SK', nom: 'Saskatchewan' },
  { code: 'NS', nom: 'Nouvelle-Écosse' },
  { code: 'NB', nom: 'Nouveau-Brunswick' },
  { code: 'NL', nom: 'Terre-Neuve-et-Labrador' },
  { code: 'PE', nom: 'Île-du-Prince-Édouard' },
  { code: 'NT', nom: 'Territoires du Nord-Ouest' },
  { code: 'YT', nom: 'Yukon' },
  { code: 'NU', nom: 'Nunavut' },
]
