import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MyReactComponent } from "src/components/my-react-component/MyReactComponent";
import * as React from "react";

import * as ReactDOM from "react-dom";

const containerElementName = "myReactComponentContainer";

@Component({
  selector: "app-my-component",
  template: `<span #${containerElementName}></span>`,
  styleUrls: ["./MyReactComponent.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MyComponentWrapperComponent
  implements OnChanges, OnDestroy, AfterViewInit, OnInit
{
  @ViewChild(containerElementName, { static: false }) containerRef: ElementRef;

  @Input() public counter = 10;
  @Output() public componentClick = new EventEmitter<void>();

  public customEventCounter = new CustomEvent("counter");

  constructor() {
    this.handleDivClicked = this.handleDivClicked.bind(this);
  }

  public handleDivClicked() {
    console.log("handleDivClicked");
    this.componentClick.emit();
  }

  public ngOnInit() {
    window.addEventListener("counter", this.handleDivClicked);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    if (this.containerRef) {
      ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
    }

    window.removeEventListener("counter", this.handleDivClicked);
  }

  private render() {
    const { counter, customEventCounter } = this;

    if (this.containerRef) {
      ReactDOM.render(
        <div className={"i-am-classy"}>
          <MyReactComponent
            onClick={this.handleDivClicked}
            counter={counter}
            customEventCounter={customEventCounter}
          />
        </div>,
        this.containerRef.nativeElement
      );
    }
  }
}
