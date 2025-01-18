import defaultIO from './defaultIO.listeners'
import download from './download.listeners'
import notification from './notification.listeners'
import progress from './progress.listeners'
import messageListeners from './message.listeners'

export default function (ctx, socket) {
  defaultIO(ctx, socket)
  // download(ctx, socket)
  notification(ctx, socket)
  progress(ctx, socket)
  messageListeners(ctx, socket)
}
