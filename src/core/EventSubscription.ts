import EventSubscriptionVendor from './EventSubscriptionVendor'

export default class EventSubscription {
  subscriber: EventSubscriptionVendor | null
  eventType: string
  key: number

  constructor(subscriber: EventSubscriptionVendor) {
    this.subscriber = subscriber
    this.eventType = ''
    this.key = 0
  }

  remove(): void {
    if (this.subscriber) {
      this.subscriber.removeSubscription(this)
      this.subscriber = null
    }
  }
}
