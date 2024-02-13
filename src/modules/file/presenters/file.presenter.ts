import { ApiProperty } from '@nestjs/swagger';

export class FilePresenter {
  @ApiProperty()
  public fieldname?: string;

  @ApiProperty()
  public originalname?: string;

  @ApiProperty()
  public url?: string;

  constructor(props: FilePresenter) {
    this.fieldname = props?.fieldname;
    this.originalname = props?.originalname;
    this.url = props?.url;
  }
}
