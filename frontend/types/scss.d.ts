// types/scss.d.ts
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

// This allows SCSS modules to be treated as global types across your whole app.
