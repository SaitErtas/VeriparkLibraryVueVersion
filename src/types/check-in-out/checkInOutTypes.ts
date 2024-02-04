export interface CheckOutType {
  bookId: number
  userName: string
  bookName: string
  tckn: number
  phoneNumber: string
}

export interface CheckInPostType {
  chekcInOutId: number
}

export interface BookCheckInOutType {
  id: number
  userName: string
  tckn: number
  phoneNumber: number
  checkOutDate: Date
  checkInDate: Date
  realizedCheckInDate: Date
  punishmentDayCount: number
  punishmentAmount: number
}
