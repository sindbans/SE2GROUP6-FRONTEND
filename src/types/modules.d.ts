// src/types/modules.d.ts
declare module "*.jsx" {
    import type { FC } from "react";
    const component: FC<any>;
    export default component;
}
