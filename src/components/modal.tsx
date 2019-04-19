import { Component, Prop, Method } from "@stencil/core";
import classnames from 'classnames';

@Component({
  tag: 'ez-modal',
  styleUrls: [
    './modal.css',
    '../../node_modules/animate.css/animate.css'
  ],
  scoped: true,
})
export class Modal {
  firstRender: boolean = true;
  @Prop({
    reflectToAttr: true,
    mutable: true,
  })
  isOpen: boolean = false;

  @Method()
  open() {
    this.isOpen = true;
  }

  @Method()
  close() {
    this.isOpen = false;
  }

  componentDidLoad() {
    this.firstRender = false;
  }

  render() {
    console.log('firstRender: ', this.firstRender);
    return ([
      <div
        class={
          classnames(
            'backdrop',
            'fixed top left w-full h-screen bg-black z-10',
            {
              'opacity-75 pointer-events-auto': this.isOpen,
              'opacity-0 pointer-events-none': !this.isOpen
            }
          )
        }
        onClick={this.close.bind(this)}
      />,
      <div class={
        classnames(
          'ez-modal',
          'fixed w-screen md--w-1/2 pin-t z-20 bg-white md--rounded mt-0 md--mt-32 p-8 h-screen md--h-auto md--max-h-1/2vh animated overflow-hidden flex flex-col',
          {
            'opacity-100 pointer-events-auto fadeInDown': this.isOpen,
            'opacity-0 pointer-events-none': !this.isOpen,
            'fadeOutUp': !this.firstRender && !this.isOpen,
          }
        )
      }>
        <header class="relative">
          <slot name="title"><h1 class="m-0">Alert</h1></slot>
          <button
            onClick={this.close.bind(this)}
            class="absolute pin-t pin-r mr-2 font-sans text-2xl cursor-pointer border-none bg-white focus--outline-none"
          >X</button>
        </header>
        <div class="relative block overflow-y-auto scrolling-auto">
          <slot />
        </div>
      </div>
    ]);
  }
}
