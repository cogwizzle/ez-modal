import { Component, Prop, Method } from "@stencil/core";

@Component({
  tag: 'ez-modal',
  styleUrl: './modal.css',
  scoped: true,
})
export class Modal {
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

  render() {
    return ([
      <div class="backdrop" onClick={this.close.bind(this)} />,
      <div class="ez-modal">
        <header>
          <slot name="title" />
          <button onClick={this.close.bind(this)} class="ez-modal__close-button">X</button>
        </header>
        <main>
          <slot />
        </main>
      </div>
    ]);
  }
}
