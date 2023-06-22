export class OrderModel{
  id!: number
  buyDate!: string
  shipDate!: string
  deliveryDate!: string
  serviceFee!: number
  shipmentFee!: number
  totalPrice!: number
  received!: boolean
  shipAddress!: string
  merchPostName!: string
  merchPostId!: number;
  merchPostNamePhotos! : string[]
}
