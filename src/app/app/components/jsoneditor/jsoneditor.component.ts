import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import * as editor from 'jsoneditor';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'json-editor',
  template: '<div #jsonEditorContainer></div>',
  styleUrls: ['./jsoneditor.component.scss']
})

export class JsonEditorComponent implements OnInit {
  private editor: any;
  private optionsDiffer: any;
  private dataDiffer: any;

  @ViewChild('jsonEditorContainer') jsonEditorContainer: ElementRef;

  @Input() options: JsonEditorOptions = new JsonEditorOptions();
  @Input() data: Object = {};

  constructor() { }

  ngOnInit() {
    this.editor = new editor(this.jsonEditorContainer.nativeElement, this.options, this.data);
  }

  public collapseAll() {
    this.editor.collapseAll();
  }

  public expandAll() {
    this.editor.expandAll();
  }

  public focus() {
    this.editor.focus();
  }

  public get(): JSON {
    return this.editor.get();
  }

  public getMode(): JsonEditorMode {
    return this.editor.getMode() as JsonEditorMode;
  }

  public getName(): string {
    return this.editor.getName();
  }

  public getText(): string {
    return this.editor.getText();
  }

  public set(json: JSON) {
    this.editor.set(json);
  }

  public setMode(mode: JsonEditorMode) {
    this.editor.setMode(mode);
  }

  public setName(name: string) {
    this.editor.setName(name);
  }

  public setSchema(schema: any) {
    this.editor.setSchema(schema);
  }

  public setOptions(newOptions: JsonEditorOptions) {
    if (this.editor) {
      this.editor.destroy();
    }
    this.options = newOptions;
    this.ngOnInit();
  }

  public destroy() {
    this.editor.destroy();
  }
}

export type JsonEditorMode = 'tree' | 'view' | 'form' | 'code' | 'text';

export interface JsonEditorTreeNode {
  field: String,
  value: String,
  path: String[]
}

export class JsonEditorOptions {
  public ace: Object;
  public ajv: Object;
  public onChange: () => void;
  public onEditable: (node: JsonEditorTreeNode | {}) => boolean | { field: boolean, value: boolean };
  public onError: (error: any) => void;
  public onModeChange: (newMode: JsonEditorMode, oldMode: JsonEditorMode) => void;
  public escapeUnicode: boolean;
  public sortObjectKeys: boolean;
  public history: boolean;
  public mode: JsonEditorMode;
  public modes: JsonEditorMode[];
  public name: String;
  public schema: Object;
  public search: boolean;
  public indentation: Number;
  public theme: Number;
  public language: String;
  public languages: Object;

  constructor() {
    this.escapeUnicode = false;
    this.sortObjectKeys = false;
    this.history = true;
    this.mode = 'tree';
    this.search = true;
    this.indentation = 2;
  }

}
