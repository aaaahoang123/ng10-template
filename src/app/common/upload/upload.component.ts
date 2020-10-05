import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NzUploadChangeParam, NzUploadFile, NzUploadListType} from 'ng-zorro-antd/upload';
import {SimpleControlValueAccessor} from '../../core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {Observable, Observer} from 'rxjs';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

const compressImage = (file: NzUploadFile, ratio: number, maxWidth: number, callback: (result: Blob) => void): void => {
  getBase64(file as any)
    .then((base64) => {
      const canvas = document.createElement('canvas');
      const img = document.createElement('img');
      img.src = base64 as string;
      img.onload = () => {
        const newWidth = img.width > maxWidth ? maxWidth : img.width;
        const newHeight = img.height * (newWidth / img.width);
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        // ctx.fillStyle = 'red';
        // ctx.textBaseline = 'middle';
        // ctx.fillText('Ant Design', 20, 20);
        const trueRatio = ratio > 1
          ? 1
          : ratio < 0
            ? 0.8
            : ratio;
        canvas.toBlob(blob => callback(blob), 'image/jpeg', trueRatio);
      };
    });
};

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadComponent),
      multi: true
    }
  ]
})
export class UploadComponent extends SimpleControlValueAccessor<string[]> implements OnInit {
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  @Input() nzAction = `${environment.baseUrl}/upload-image`;
  @Input() nzListType: NzUploadListType = 'picture-card';
  @Input() maxSize: number;
  @Input() nzName = 'file';
  @Input() nzData: any;
  @Input() compressRatio = 1;
  @Input() maxImageWidth = Infinity;
  @Input() retrieveImageFromResponse: ((response: any) => string) | string = response => response.data.name;
  @Input() pathToUrl: (path: string) => string = path => path;

  writeValue(paths: string[]): void {
    if (!isEqual(paths, this.model)) {
      this.model = paths;
      this.fileList = paths?.map((path, index) => ({
        uid: 0 - index as any,
        name: path,
        status: 'done',
        url: this.pathToUrl(path)
      }));
    }
  }

  async handlePreview(file: NzUploadFile): Promise<void> {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  }

  onCancelPreview(): void {
    this.previewVisible = false;
  }

  beforeUpload(file: NzUploadFile): Observable<Blob> {
    return new Observable((observer: Observer<Blob>) =>
      compressImage(file, this.compressRatio, this.maxImageWidth, (result) => {
        observer.next(result);
        observer.complete();
      })
    );
  }

  onUploadImage($event: NzUploadChangeParam): void {
    if ($event.type === 'success') {
      this.model = [
        ...this.model || [],
        this.retrieveImageFromResponseInternal($event.file.response)
      ];
      this.propagateChange?.(this.model);
    }
    if ($event.type === 'removed') {
      this.model = this.fileList
        .filter(file => file !== $event.file)
        .map(file => file.response ? this.retrieveImageFromResponseInternal(file.response) : file.name);
      this.propagateChange?.(this.model);
    }
  }

  protected retrieveImageFromResponseInternal(response: any): string {
    return isFunction(this.retrieveImageFromResponse)
      ? this.retrieveImageFromResponse(response)
      : isString(this.retrieveImageFromResponse)
        ? get(response, this.retrieveImageFromResponse)
        : response.toString();
  }

  ngOnInit(): void {
    this.handlePreview = this.handlePreview.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
  }
}
