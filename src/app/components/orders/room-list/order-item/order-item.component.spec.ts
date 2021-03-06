import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorItemComponent } from './order-item.component';

describe('RoomItemComponent', () => {
  let component: AuthorItemComponent;
  let fixture: ComponentFixture<AuthorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
