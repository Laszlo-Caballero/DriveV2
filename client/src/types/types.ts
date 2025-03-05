export interface ResponsiveFolders {
  message: string;
  statusCode: number;
  data: { folders: string[]; files: string[] };
}

export interface ResponsiveFolder {
  message: string;
  statusCode: number;
  data: string[];
}
