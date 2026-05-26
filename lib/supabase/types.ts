export type Role = 'admin' | 'editor' | 'viewer'

export type Profile = {
  id: string
  email: string
  full_name: string | null
  role: Role | null // null = connexion Google sans rôle attribué
  created_at: string
}

export type PartnerStatus = 'confirmed' | 'pending' | 'cancelled'
export type ExhibitorStatus = 'confirmed' | 'pending' | 'cancelled'
export type ContractStatus = 'draft' | 'sent' | 'signed' | 'cancelled'
export type DeliverableStatus = 'pending' | 'in_progress' | 'completed' | 'overdue'
export type ActivationStatus = 'planned' | 'active' | 'completed' | 'cancelled'

export type Partner = {
  id: string
  name: string
  logo_url: string | null
  website_url: string | null
  level: string
  description_fr: string | null
  description_en: string | null
  public_visibility: boolean
  status: PartnerStatus
  logo_validated: boolean
  created_at: string
}

export type Exhibitor = {
  id: string
  name: string
  logo_url: string | null
  website_url: string | null
  sector: string | null
  description_fr: string | null
  description_en: string | null
  booth_number: string | null
  public_visibility: boolean
  status: ExhibitorStatus
  logo_validated: boolean
  created_at: string
}

export type Contract = {
  id: string
  partner_id: string | null
  exhibitor_id: string | null
  amount: number | null
  status: ContractStatus
  signed_at: string | null
  notes: string | null
  created_at: string
}

export type Contact = {
  id: string
  partner_id: string | null
  exhibitor_id: string | null
  full_name: string
  email: string
  phone: string | null
  role: string | null
  is_primary: boolean
  created_at: string
}

export type Activation = {
  id: string
  partner_id: string | null
  title_fr: string
  title_en: string | null
  description_fr: string | null
  description_en: string | null
  public_visibility: boolean
  status: ActivationStatus
  created_at: string
}

export type Deliverable = {
  id: string
  partner_id: string | null
  exhibitor_id: string | null
  title: string
  due_date: string | null
  status: DeliverableStatus
  notes: string | null
  created_at: string
}

export type KPI = {
  id: string
  metric_name: string
  value: number
  unit: string | null
  recorded_at: string
  notes: string | null
}
