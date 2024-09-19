import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typescripte dispatch'i kullanmak için `useAppDispatch` hookunu import etmeniz gerekiyor.
