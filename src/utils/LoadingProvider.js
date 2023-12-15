import React, { useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';

// Applies the loading screen context to the application
export const showLoadingScreen = () => {
  let loadingScreen = document.getElementById('loading-screen');

  if (loadingScreen) {
    loadingScreen.style.display = 'flex';
  }
}

// Removes the loading screen context from the application
export const hideLoadingScreen = () => {
  let loadingScreen = document.getElementById('loading-screen');

  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
}