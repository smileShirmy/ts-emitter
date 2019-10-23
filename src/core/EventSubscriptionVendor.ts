import EmitterSubscription from './EmitterSubscription'
import EventSubscription from './EventSubscription'

interface SubscriptionsForType {
  [eventType: string]: any
}

export default class EventSubscriptionVendor {
  subscriptionsForType: SubscriptionsForType

  constructor() {
    this.subscriptionsForType = {}
  }

  addSubscription(eventType: string, subscription: EmitterSubscription): EmitterSubscription {
    if (!this.subscriptionsForType[eventType]) {
      this.subscriptionsForType[eventType] = []
    }
    const key = this.subscriptionsForType[eventType].length
    this.subscriptionsForType[eventType].push(subscription)
    subscription.eventType = eventType
    subscription.key = key
    return subscription
  }

  removeAllSubscriptions(eventType: string): void {
    if (eventType === undefined) {
      this.subscriptionsForType = {}
    } else {
      delete this.subscriptionsForType[eventType]
    }
  }

  removeSubscription(subscription: EventSubscription): void {
    const eventType = subscription.eventType
    const key = subscription.key

    const subscriptionsForType = this.subscriptionsForType[eventType]
    if (subscriptionsForType) {
      delete subscriptionsForType[key]
    }
  }

  getSubscriptionsForType(eventType: string): Array<EmitterSubscription> {
    return this.subscriptionsForType[eventType]
  }
}
