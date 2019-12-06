import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadAvatarPage } from './upload-avatar.page';

describe('UploadAvatarPage', () => {
  let component: UploadAvatarPage;
  let fixture: ComponentFixture<UploadAvatarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAvatarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadAvatarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
