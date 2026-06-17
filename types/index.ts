export type Category =
  | "EXCURSION"
  | "CITY"
  | "AVENTURA"
  | "NAUTICO"
  | "CULTURAL"

export interface Tour {
  id: string
  name: string
  slug: string
  category: Category
  shortDesc: string
  fullDesc: string
  duration: string
  schedule: string
  includes: string[]
  excludes: string[]
  extras: string | null
  notes: string | null
  priceAdult: number | null
  priceChild: number | null
  childPolicy: string | null
  paymentMethods: string[]
  featured: boolean
  active: boolean
  createdAt: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string | null
  tourId?: string | null
  tourName?: string | null
  date?: string | null
  passengers?: number | null
  message?: string | null
  source: string
  createdAt: string
}

export interface ChatMessage {
  id: string
  sessionId: string
  role: "user" | "assistant"
  content: string
  createdAt: string
}
