import EmitterSubscription from './EmitterSubscription'
import EventSubscriptionVendor from './EventSubscriptionVendor'

export default class BaseEventEmitter {
  currentSubscription: EmitterSubscription | null
  subscriber: EventSubscriptionVendor

  constructor() {
    this.subscriber = new EventSubscriptionVendor()
    this.currentSubscription = null
  }

  addListener(eventType: string, listener: Function): EmitterSubscription {
    return this.subscriber.addSubscription(
      eventType,
      new EmitterSubscription(this.subscriber, listener)
    )
  }

  once(eventType: string, listener: Function): EmitterSubscription {
    return this.addListener(eventType, (...args: any) => {
      this.removeCurrentListener()
      listener(...args)
    })
  }

  removeAllListeners(eventType: string): void {
    this.subscriber.removeAllSubscriptions(eventType)
  }

  removeCurrentListener(): void {
    if (!this.currentSubscription) {
      throw Error('Not in an emitting cycle; there is no current subscription')
    }
    this.subscriber.removeSubscription(this.currentSubscription)
  }

  listeners(eventType: string): Array<Function> {
    const subscriptions = this.subscriber.getSubscriptionsForType(eventType)
    return subscriptions
      ? subscriptions.map((subscription: EmitterSubscription) => subscription.listener)
      : []
  }

  emit(eventType: string, ...data: any): void {
    const subscriptions = this.subscriber.getSubscriptionsForType(eventType)
    if (subscriptions) {
      const keys = Object.keys(subscriptions)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i] as any
        const subscription = subscriptions[key]
        if (subscription) {
          this.currentSubscription = subscription
          this.emitToSubscription(subscription, eventType, ...data)
        }
      }
      this.currentSubscription = null
    }
  }

  protected emitToSubscription(subscription: any, eventType: string, ...data: any): void {
    subscription.listener(...data)
  }
}
