export interface MenuItem {
  id: string
  name: string
  priceTapa: number
  priceMedia: number
  /** true = mismos precios para tapa y media (ej: platos de pieza única) */
  samePrice: boolean
  order: number
}

export interface MenuCategory {
  id: string
  name: string
  icon?: string
  order: number
  items: MenuItem[]
}

export interface MenuData {
  categories: MenuCategory[]
  barName: string
  updatedAt?: string
}
