export interface BlogPost {
    fields: {
      slug: string;
      titulo: string;
      fecha: string;
      imagen: {
        fields: {
          file: {
            url: string;
          };
        };
      };
      contenido: {
        content: {
          content: {
            value: string;
          }[];
        }[];
      };
      body?: string;
    };
  }