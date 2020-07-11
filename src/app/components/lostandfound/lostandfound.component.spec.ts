import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostandfoundComponent } from './lostandfound.component';

describe('LostandfoundComponent', () => {
  let component: LostandfoundComponent;
  let fixture: ComponentFixture<LostandfoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostandfoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostandfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
