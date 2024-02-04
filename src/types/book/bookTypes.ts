export interface BookListItemType {
  id: number
  name: string
  isbn: string
  stockAmount: number
  checkOutAmount: number
  status: boolean
  availableAmount: number
  price: 0
  publishDate: Date
}

export interface AddBookType {
  name: string
  isbn: string
  price: number
  stockAmount: number
  publishDate: Date
}

export interface UpdateBookType {
  id: number
  name: string
  isbn: string
  price: number
  stockAmount: number
  publishDate: Date
}
