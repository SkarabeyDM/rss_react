import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Catalog } from '../../../pages/Catalog';
import { NotFound } from '../../../pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
