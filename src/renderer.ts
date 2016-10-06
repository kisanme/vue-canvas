import * as Vue from 'vue'
import { warn } from './utils'

export class Renderer {
  constructor (private ctx: CanvasRenderingContext2D) {}

  clear (): void {
    const { width, height } = this.ctx.canvas
    this.ctx.clearRect(0, 0, width, height)
  }

  render (vm: Vue): void {
    const options = vm.$options.canvas
    if (process.env.NODE_ENV !== 'production') {
      if (!options || typeof options.render !== 'function') {
        warn(
          'canvas.render must be implemented for the shape components ' +
          `<${vm._contentTag}>`
        )
        return
      }
    }
    options!.render!.call(vm, this.ctx)

    vm.$children.forEach(child => this.render(child))
  }
}