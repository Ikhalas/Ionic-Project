import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NonlogintabPage } from './nonlogintab.page';

describe('NonlogintabPage', () => {
  let component: NonlogintabPage;
  let fixture: ComponentFixture<NonlogintabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonlogintabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NonlogintabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
