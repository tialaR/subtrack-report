export type RecordDay = {
  id: string;
  title: string;
  image: string;
};


export type RecordDayPreviewProps = {
  recordsDay: RecordDay[];
  isHidden?: boolean;
}
