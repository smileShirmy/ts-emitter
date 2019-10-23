import EventSubscription from './EventSubscription'

export default class EmitterSubscription extends EventSubscription {
  listener: Function

  constructor(subscriber: any, listener: Function) {
    super(subscriber)
    this.listener = listener
  }
}
