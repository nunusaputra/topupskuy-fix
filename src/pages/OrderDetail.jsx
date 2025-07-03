import React, { useEffect, useState } from "react";
import SideContent from "../components/order/SideContent";
import DetailContent from "../components/order/DetailContent";
import { fetchProduct } from "../services";
import { useParams } from "react-router-dom";
import CoverHeader from "../components/order/CoverHeader";
import { FaArrowAltCircleUp } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";

const product = {
  product: {
    id: 1,
    title: "Mobile Legends ",
    sub_title: "S1A",
    slug: "mobile-legends",
    description:
      '<h2 data-testid="lgpdpcategoryinfo-h2-howtotopup" class="font-bold text-xs mb-2" style="border-color: rgba(229,231,235,var(--tw-border-opacity)); border-image: initial; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); --tw-border-opacity: 1; --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-blur: var(--tw-empty,/*!*/ /*!*/); --tw-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-invert: var(--tw-empty,/*!*/ /*!*/); --tw-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-drop-shadow: var(--tw-empty,/*!*/ /*!*/); --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow); --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59,130,246,0.5); --tw-backdrop-blur: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-invert: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-opacity: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia); color: rgb(20, 20, 20); font-family: Oxanium, sans-serif; background-color: rgb(255, 255, 255);">Cara Top Up</h2><h6 class="fw-bold" style="margin-bottom: 0.5rem; line-height: 1.2; color: rgb(33, 37, 41); font-size: 1rem; caret-color: rgb(33, 37, 41); font-family: &quot;Plus Jakarta Sans&quot;, sans-serif; -webkit-text-size-adjust: 100%; font-weight: 700 !important;"><ol class="list-decimal pl-3" style="border-color: rgba(229,231,235,var(--tw-border-opacity)); border-image: initial; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); --tw-border-opacity: 1; --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-blur: var(--tw-empty,/*!*/ /*!*/); --tw-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-invert: var(--tw-empty,/*!*/ /*!*/); --tw-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-drop-shadow: var(--tw-empty,/*!*/ /*!*/); --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow); --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59,130,246,0.5); --tw-backdrop-blur: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-invert: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-opacity: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia); color: rgb(20, 20, 20); font-family: Oxanium, sans-serif; font-size: medium; font-weight: 400; background-color: rgb(255, 255, 255);"><li data-testid="lgpdpcategoryinfo-howtotoptup-0" class="text-xs text-gray-500 mb-1" style="border-color: rgba(229,231,235,var(--tw-border-opacity)); border-image: initial; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); --tw-border-opacity: 1; --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-blur: var(--tw-empty,/*!*/ /*!*/); --tw-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-invert: var(--tw-empty,/*!*/ /*!*/); --tw-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-drop-shadow: var(--tw-empty,/*!*/ /*!*/); --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow); --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59,130,246,0.5); --tw-backdrop-blur: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-invert: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-opacity: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia); --tw-text-opacity: 1;">Masukkan&nbsp;<span style="border-color: rgba(229,231,235,var(--tw-border-opacity)); border-image: initial; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); --tw-border-opacity: 1; --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-blur: var(--tw-empty,/*!*/ /*!*/); --tw-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-invert: var(--tw-empty,/*!*/ /*!*/); --tw-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-drop-shadow: var(--tw-empty,/*!*/ /*!*/); --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow); --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59,130,246,0.5); --tw-backdrop-blur: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-invert: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-opacity: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia); font-weight: bolder;">User ID</span>&nbsp;dan&nbsp;<span style="border-color: rgba(229,231,235,var(--tw-border-opacity)); border-image: initial; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); --tw-border-opacity: 1; --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-blur: var(--tw-empty,/*!*/ /*!*/); --tw-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-invert: var(--tw-empty,/*!*/ /*!*/); --tw-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-drop-shadow: var(--tw-empty,/*!*/ /*!*/); --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow); --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59,130,246,0.5); --tw-backdrop-blur: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-invert: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-opacity: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia); font-weight: bolder;">Zone ID</span>&nbsp;Anda, Contoh : 1234567 (1234)</li><li data-testid="lgpdpcategoryinfo-howtotoptup-1" class="text-xs text-gray-500 mb-1" style="border-color: rgba(229,231,235,var(--tw-border-opacity)); border-image: initial; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); --tw-border-opacity: 1; --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-blur: var(--tw-empty,/*!*/ /*!*/); --tw-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-invert: var(--tw-empty,/*!*/ /*!*/); --tw-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-drop-shadow: var(--tw-empty,/*!*/ /*!*/); --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow); --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59,130,246,0.5); --tw-backdrop-blur: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-invert: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-opacity: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia); --tw-text-opacity: 1;">Pilih Nominal Diamonds yang kamu inginkan</li><li data-testid="lgpdpcategoryinfo-howtotoptup-2" class="text-xs text-gray-500 mb-1" style="border-color: rgba(229,231,235,var(--tw-border-opacity)); border-image: initial; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); --tw-border-opacity: 1; --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-blur: var(--tw-empty,/*!*/ /*!*/); --tw-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-invert: var(--tw-empty,/*!*/ /*!*/); --tw-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-drop-shadow: var(--tw-empty,/*!*/ /*!*/); --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow); --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59,130,246,0.5); --tw-backdrop-blur: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-invert: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-opacity: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia); --tw-text-opacity: 1;">Selesaikan pembayaran</li><li data-testid="lgpdpcategoryinfo-howtotoptup-3" class="text-xs text-gray-500 mb-1" style="border-color: rgba(229,231,235,var(--tw-border-opacity)); border-image: initial; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); --tw-border-opacity: 1; --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-blur: var(--tw-empty,/*!*/ /*!*/); --tw-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-invert: var(--tw-empty,/*!*/ /*!*/); --tw-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-drop-shadow: var(--tw-empty,/*!*/ /*!*/); --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow); --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59,130,246,0.5); --tw-backdrop-blur: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-brightness: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-contrast: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-grayscale: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-hue-rotate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-invert: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-opacity: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-saturate: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-sepia: var(--tw-empty,/*!*/ /*!*/); --tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia); --tw-text-opacity: 1;">Diamonds akan ditambahkan ke akun Mobile Legends kamu</li></ol></h6><p style="margin-bottom: 1rem; caret-color: rgb(33, 37, 41); color: rgb(33, 37, 41); font-family: &quot;Plus Jakarta Sans&quot;, sans-serif; -webkit-text-size-adjust: 100%; border-color: rgba(229,231,235,var(--tw-border-opacity));">Note :</p><p style="margin-bottom: 1rem; caret-color: rgb(33, 37, 41); color: rgb(33, 37, 41); font-family: &quot;Plus Jakarta Sans&quot;, sans-serif; -webkit-text-size-adjust: 100%; border-color: rgba(229,231,235,var(--tw-border-opacity));"><span style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; font-family: inherit; font-size: 1rem;"></span></p><p style="margin-bottom: 1rem; caret-color: rgb(33, 37, 41); color: rgb(33, 37, 41); font-family: &quot;Plus Jakarta Sans&quot;, sans-serif; -webkit-text-size-adjust: 100%; border-color: rgba(229,231,235,var(--tw-border-opacity));"><span style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; font-family: inherit; font-size: var(--bs-body-font-size); text-align: var(--bs-body-text-align);">- Pembelian Weekly maksimal 10X atau 70 Hari (lebih dari itu weekly tidak masuk atau hangus)</span></p>',
    active: true,
    featured: true,
    position: 2,
    checkIdUrl: "https://www.lapakgaming.com/api/uid-check",
    logo: {
      id: 453,
      name: "temp18112908666033524989mobile legends",
      path: "https://res.cloudinary.com/dkvaaxokv/image/upload/v1730428958/zbesf2fit6qz3s6tkbf3.webp",
      isDelete: false,
    },
    banner: null,
    helper: null,
    category: {
      id: 1,
      name: "Game Populer",
      active: true,
      sequence: 1,
    },
  },
  trxUserInputs: [
    {
      id: 1,
      label: "Masukkan Data Akun",
      instruction:
        "Klik profile di pojok kiri atas untuk melihat ID. Contoh: ID tercantum 12345678 (1234), maka isi 12345678 di ID dan 1234 di Server.",
      required: false,
      userInput: {
        id: 1,
        name: "Field Section Title",
      },
    },
    {
      id: 2,
      label: "Pilih Item",
      instruction: "",
      required: false,
      userInput: {
        id: 2,
        name: "Item Section Title",
      },
    },
    {
      id: 3,
      label: "Pilih Pembayaran",
      instruction: "",
      required: false,
      userInput: {
        id: 3,
        name: "Payment Section Title",
      },
    },
    {
      id: 4,
      label: "Kode Promo",
      instruction: "",
      required: false,
      userInput: {
        id: 4,
        name: "Voucher Section Title",
      },
    },
    {
      id: 5,
      label: "Nomor WhatsApp",
      instruction:
        "Isi nomor WhatsApp yang dapat dihubungi jika terjadi masalah.",
      required: false,
      userInput: {
        id: 5,
        name: "Buy Section Title",
      },
    },
  ],
  ffAttributes: [
    {
      id: 1,
      key_: "name",
      value_: "userId",
      isDelete: false,
      formField: {
        id: 1,
        type: "Input",
        isDelete: false,
      },
    },
    {
      id: 2,
      key_: "placeholder",
      value_: "Masukkan ID",
      isDelete: false,
      formField: {
        id: 1,
        type: "Input",
        isDelete: false,
      },
    },
    {
      id: 3,
      key_: "type",
      value_: "number",
      isDelete: false,
      formField: {
        id: 1,
        type: "Input",
        isDelete: false,
      },
    },
    {
      id: 4,
      key_: "name",
      value_: "zoneId",
      isDelete: false,
      formField: {
        id: 2,
        type: "Input",
        isDelete: false,
      },
    },
    {
      id: 5,
      key_: "placeholder",
      value_: "Masukkan Server",
      isDelete: false,
      formField: {
        id: 2,
        type: "Input",
        isDelete: false,
      },
    },
    {
      id: 6,
      key_: "type",
      value_: "number",
      isDelete: false,
      formField: {
        id: 2,
        type: "Input",
        isDelete: false,
      },
    },
  ],
  myItems: [
    {
      id: 146,
      sellPrice: 27138,
      name: "Weekly Diamon Pass",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 660,
      sellPrice: 54276,
      name: "Weekly Diamond Pass 2x",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 661,
      sellPrice: 81414,
      name: "Weekly Diamond Pass 3x",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 662,
      sellPrice: 108552,
      name: "Weekly Diamond Pass 4x",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 663,
      sellPrice: 135690,
      name: "Weekly Diamond Pass 5x",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 510,
      sellPrice: 78901,
      name: "301 Diamonds (Starlight)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 11,
      sellPrice: 1457,
      name: "5 Diamonds (5 + 0 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 12,
      sellPrice: 3397,
      name: "12 Diamonds (11+ 1 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 14,
      sellPrice: 5337,
      name: "19 Diamonds (17 + 2 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 15,
      sellPrice: 7800,
      name: "28 Diamonds (25 + 3 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 16,
      sellPrice: 11643,
      name: "44 Diamonds (40 + 4 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 17,
      sellPrice: 15601,
      name: "59 Diamonds (53 + 6 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 18,
      sellPrice: 22426,
      name: "85 Diamonds (77 + 8 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 183,
      sellPrice: 31202,
      name: "118 Diamonds (107 + 11)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 19,
      sellPrice: 37978,
      name: "144 Diamonds (130 + 14 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 20,
      sellPrice: 44851,
      name: "170 Diamonds (154 + 16 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 404,
      sellPrice: 62935,
      name: "240 Diamonds (217 + 23 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 23,
      sellPrice: 74578,
      name: "284 Diamonds (257 + 27 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 24,
      sellPrice: 89703,
      name: "340 Diamonds (308 + 32 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 25,
      sellPrice: 107034,
      name: "408 Diamonds (367 + 41 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 27,
      sellPrice: 145991,
      name: "568 Diamonds (503 + 65 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 403,
      sellPrice: 163048,
      name: "632 (561+ 71 Bonus) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 402,
      sellPrice: 190842,
      name: "738 Diamonds (657 + 81 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 28,
      sellPrice: 194239,
      name: "750 Diamonds (665 + 85 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 29,
      sellPrice: 222675,
      name: "875 Diamonds (774 + 101 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 30,
      sellPrice: 245101,
      name: "960 Diamonds (851 + 109 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 32,
      sellPrice: 267527,
      name: "1045 Diamonds (928 + 117 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 33,
      sellPrice: 300501,
      name: "1171 Diamonds (1030 + 141 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 34,
      sellPrice: 329709,
      name: "1283 (1141+142) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 35,
      sellPrice: 445350,
      name: "1750 (1548+202) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 36,
      sellPrice: 484072,
      name: "2010 (1708+302) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 37,
      sellPrice: 547007,
      name: "2250 (1925+325) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 41,
      sellPrice: 706747,
      name: "2885 (2482+403) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 43,
      sellPrice: 856219,
      name: "3453 Diamonds (2985 + 468 Bonus)",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 44,
      sellPrice: 968143,
      name: "4020 (3416+604) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 46,
      sellPrice: 1167390,
      name: "4830 (4003+827) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 47,
      sellPrice: 1390065,
      name: "5705 (4777+928) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 49,
      sellPrice: 1651462,
      name: "6840 (5711+1129) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 316,
      sellPrice: 1874137,
      name: "7715 (6485+1230) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 511,
      sellPrice: 2334780,
      name: "9660 (8006+1654) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
    {
      id: 512,
      sellPrice: 3502170,
      name: "14490 (12009+2481) Diamonds",
      path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
    },
  ],
  channels: [
    {
      id: 0,
      name: "Saldo",
      code: "Saldo",
      feeFlat: 0,
      feePercent: 0,
      maxAmount: 10000000,
      minAmount: 100,
      active: true,
      category: "Saldo",
      instructionTitle: "-",
      instructionDetail: "-",
      icon: {
        id: 1,
        name: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
        path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1727756136/zudsdc06ynxpu75rdi86.webp",
        isDelete: true,
      },
    },
    {
      id: 1,
      name: "QRIS / QR Code",
      code: "QRIS",
      feeFlat: 0,
      feePercent: 3,
      maxAmount: 10000000,
      minAmount: 500,
      active: true,
      category: "QRIS",
      instructionTitle: "Dengan QRIS",
      instructionDetail:
        "<p>1. Screenshot barcode di web dan potong gambar sampai hanya menyisakan gambar barcodenya (atau download barcodenya)</p><p>2. Masuk ke aplikasi E-wallet yang Anda gunakan, kemudian klik tombol Scan atau Bayar</p><p>3. Setelah itu, klik icon Upload QR dari Galeri dan Pilih gambar QRIS yang kamu Screenshot atau Download yang telah disimpan di Galeri\n</p><p>4. Klik OK untuk melanjutkan ke proses berikutnya\n</p><p>5. Klik Bayar untuk menyelesaikan proses transaksi</p>",
      icon: {
        id: 346,
        name: "temp179772106084115122451000265372",
        path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1723992464/lxoqpfzevw1ojepzwwh3.webp",
        isDelete: false,
      },
    },
    {
      id: 3,
      name: "ShopeePay",
      code: "ShopeePay",
      feeFlat: 0,
      feePercent: 4,
      maxAmount: 10000000,
      minAmount: 500,
      active: true,
      category: "E-Wallet",
      instructionTitle: "Dengan QRIS",
      instructionDetail:
        "1. Screenshot barcode di web dan potong gambar sampai hanya menyisakan gambar barcodenya (atau download barcodenya)\n2. Masuk ke aplikasi E-wallet yang Anda gunakan, kemudian klik tombol Scan atau Bayar\n3. Setelah itu, klik icon Upload QR dari Galeri\n3. Pilih gambar QRIS yang kamu Screenshot atau Download yang telah disimpan di Galeri\n4. Klik OK untuk melanjutkan ke proses berikutnya\n6. Klik Bayar untuk menyelesaikan proses transaksi",
      icon: {
        id: 348,
        name: "temp65661578502340625471000265380",
        path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1723992525/khdevubjmqjwedtgoc7j.webp",
        isDelete: false,
      },
    },
    {
      id: 7,
      name: "BNI",
      code: "BNI",
      feeFlat: 5000,
      feePercent: 0,
      maxAmount: 10000000,
      minAmount: 20000,
      active: true,
      category: "Virtual Account",
      instructionTitle: "Melalui Mobile Banking / ATM",
      instructionDetail:
        "1. Pilih Ã¢â‚¬Å“Menu LainÃ¢â‚¬Â� &gt; Ã¢â‚¬Å“TransferÃ¢â‚¬Â� &gt; Ã¢â‚¬Å“Transaksi LainnyaÃ¢â‚¬Â�\n2. Pilih ke Rekening BNI\n3. Masukkan nomor Virtual Account Anda dan klik Ã¢â‚¬Å“BenarÃ¢â‚¬Â�\n4. Masukkan nominal sesuai tagihan, lalu pilih Ã¢â‚¬Å“YaÃ¢â‚¬Â�\n5. Jangan lupa untuk memeriksa informasi yang tertera pada layar. Pastikan semua informasi dan total tagihan yang ditampilkan sudah benar. Jika benar, pilih Ã¢â‚¬Å“YaÃ¢â‚¬Â�\n6. Selanjutnya tekan Ã¢â‚¬Å“TidakÃ¢â‚¬Â� untuk menyelesaikan transaksi",
      icon: {
        id: 74,
        name: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983614/c0qkvqbsz7qcyaaq4lxh.webp",
        path: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983614/c0qkvqbsz7qcyaaq4lxh.webp",
        isDelete: true,
      },
    },
    {
      id: 8,
      name: "Mandiri",
      code: "Mandiri",
      feeFlat: 5000,
      feePercent: 0,
      maxAmount: 10000000,
      minAmount: 20000,
      active: true,
      category: "Virtual Account",
      instructionTitle: "Melalui Mobile Banking / ATM",
      instructionDetail:
        "1. Pilih Ã¢â‚¬Å“Menu LainÃ¢â‚¬Â� &gt; Ã¢â‚¬Å“TransferÃ¢â‚¬Â� &gt; Ã¢â‚¬Å“Transaksi LainnyaÃ¢â‚¬Â�\n2. Pilih ke Rekening BNI\n3. Masukkan nomor Virtual Account Anda dan klik Ã¢â‚¬Å“BenarÃ¢â‚¬Â�\n4. Masukkan nominal sesuai tagihan, lalu pilih Ã¢â‚¬Å“YaÃ¢â‚¬Â�\n5. Jangan lupa untuk memeriksa informasi yang tertera pada layar. Pastikan semua informasi dan total tagihan yang ditampilkan sudah benar. Jika benar, pilih Ã¢â‚¬Å“YaÃ¢â‚¬Â�\n6. Selanjutnya tekan Ã¢â‚¬Å“TidakÃ¢â‚¬Â� untuk menyelesaikan transaksi",
      icon: {
        id: 76,
        name: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983825/td7tamzuoipsdcfljrmp.webp",
        path: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983825/td7tamzuoipsdcfljrmp.webp",
        isDelete: true,
      },
    },
    {
      id: 9,
      name: "BRI",
      code: "BRI",
      feeFlat: 5000,
      feePercent: 0,
      maxAmount: 10000000,
      minAmount: 20000,
      active: true,
      category: "Virtual Account",
      instructionTitle: "Melalui Mobile Banking / ATM",
      instructionDetail:
        "1. Pilih Ã¢â‚¬Å“Menu LainÃ¢â‚¬Â� &gt; Ã¢â‚¬Å“TransferÃ¢â‚¬Â� &gt; Ã¢â‚¬Å“Transaksi LainnyaÃ¢â‚¬Â�\n2. Pilih ke Rekening BNI\n3. Masukkan nomor Virtual Account Anda dan klik Ã¢â‚¬Å“BenarÃ¢â‚¬Â�\n4. Masukkan nominal sesuai tagihan, lalu pilih Ã¢â‚¬Å“YaÃ¢â‚¬Â�\n5. Jangan lupa untuk memeriksa informasi yang tertera pada layar. Pastikan semua informasi dan total tagihan yang ditampilkan sudah benar. Jika benar, pilih Ã¢â‚¬Å“YaÃ¢â‚¬Â�\n6. Selanjutnya tekan Ã¢â‚¬Å“TidakÃ¢â‚¬Â� untuk menyelesaikan transaksi",
      icon: {
        id: 75,
        name: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983814/wjanfydx7o8rahbwarto.webp",
        path: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983814/wjanfydx7o8rahbwarto.webp",
        isDelete: true,
      },
    },
    {
      id: 12,
      name: "INDOMARET",
      code: "INDOMARET",
      feeFlat: 8500,
      feePercent: 1,
      maxAmount: 5000000,
      minAmount: 10000,
      active: true,
      category: "Convenience Store",
      instructionTitle: "Kunjungi Alfamart",
      instructionDetail:
        "<p>1. Kunjungi gerai INDOMARET terdekat sebelum kode pembayaran kedaluwarsa.\n</p><p>2. Informasikan ke Kasir untuk melakukan pembayaran dengan menyebutkan nama TPSK / Topupskuyy.\n</p><p>3. Berikan informasi Nomor virtual account yang tertera di Website kepada kasir.\n</p><p>4. Pastikan jumlah pembayaran di tempat anda berbelanja sama dengan jumlah yang diberitahukan oleh kasir.\n</p><p>5. Informasikan pada kasir jika anda ingin membayar dengan uang tunai.\n</p><p>6. Konfirmasi pembayaran dengan memberikan uang tunai pada kasir.\n</p><p>7. Minta struk pembayaran sebagai bukti transaksi dari INDOMARET.\n</p><p>8. Pembayaran INDOMARET anda sudah selesai.</p>",
      icon: {
        id: 78,
        name: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983925/lfb0h2x52ty7x9m4wgdo.webp",
        path: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983925/lfb0h2x52ty7x9m4wgdo.webp",
        isDelete: true,
      },
    },
    {
      id: 15,
      name: "BCA",
      code: "BCA-QRIS",
      feeFlat: 0,
      feePercent: 3,
      maxAmount: 10000000,
      minAmount: 500,
      active: true,
      category: "Bank",
      instructionTitle: null,
      instructionDetail:
        '<p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;">1. Screenshot barcode di web dan potong gambar sampai hanya menyisakan gambar barcodenya (atau download barcodenya)</p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">2. Masuk ke aplikasi BCA Mobile yang Anda gunakan, kemudian klik tombol </span><font color="#000000" style="font-family: inherit; font-size: 1rem; background-color: rgb(255, 255, 0);">QRIS</font></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">3. Setelah itu, klik icon Upload QR dari Galeri</span></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">4. Pilih gambar QRIS yang kamu Screenshot atau Download yang telah disimpan di Galeri</span></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">5. Klik OK untuk melanjutkan ke proses berikutnya</span></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">6. Klik Bayar untuk menyelesaikan proses transaksi</span></p>',
      icon: {
        id: 489,
        name: "temp7230560660249605633images-9",
        path: "https://res.cloudinary.com/dkvaaxokv/image/upload/v1732503589/czd8ubbbpczxsqo8rmcf.webp",
        isDelete: false,
      },
    },
    {
      id: 16,
      name: "MANDIRI",
      code: "MANDIRI-QRIS",
      feeFlat: 0,
      feePercent: 3,
      maxAmount: 10000000,
      minAmount: 500,
      active: true,
      category: "Bank",
      instructionTitle: null,
      instructionDetail:
        '<p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;">1. Screenshot barcode di web dan potong gambar sampai hanya menyisakan gambar barcodenya (atau download barcodenya)</p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">2. Masuk ke aplikasi BCA Mobile yang Anda gunakan, kemudian klik tombol </span><font color="#000000" style="font-family: inherit; font-size: 1rem; background-color: rgb(255, 255, 0);">QRIS</font></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">3. Setelah itu, klik icon Upload QR dari Galeri</span></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">4. Pilih gambar QRIS yang kamu Screenshot atau Download yang telah disimpan di Galeri</span></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">5. Klik OK untuk melanjutkan ke proses berikutnya</span></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">6. Klik Bayar untuk menyelesaikan proses transaksi</span></p>',
      icon: {
        id: 76,
        name: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983825/td7tamzuoipsdcfljrmp.webp",
        path: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983825/td7tamzuoipsdcfljrmp.webp",
        isDelete: true,
      },
    },
    {
      id: 17,
      name: "BRI",
      code: "BRI-QRIS",
      feeFlat: 0,
      feePercent: 3,
      maxAmount: 10000000,
      minAmount: 500,
      active: true,
      category: "Bank",
      instructionTitle: null,
      instructionDetail:
        '<p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;">1. Screenshot barcode di web dan potong gambar sampai hanya menyisakan gambar barcodenya (atau download barcodenya)</p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">2. Masuk ke aplikasi BCA Mobile yang Anda gunakan, kemudian klik tombol </span><font color="#000000" style="font-family: inherit; font-size: 1rem; background-color: rgb(255, 255, 0);">QRIS</font></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">3. Setelah itu, klik icon Upload QR dari Galeri</span></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">4. Pilih gambar QRIS yang kamu Screenshot atau Download yang telah disimpan di Galeri</span></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">5. Klik OK untuk melanjutkan ke proses berikutnya</span></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">6. Klik Bayar untuk menyelesaikan proses transaksi</span></p>',
      icon: {
        id: 75,
        name: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983814/wjanfydx7o8rahbwarto.webp",
        path: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983814/wjanfydx7o8rahbwarto.webp",
        isDelete: true,
      },
    },
    {
      id: 18,
      name: "BNI",
      code: "BNI-QRIS",
      feeFlat: 0,
      feePercent: 3,
      maxAmount: 10000000,
      minAmount: 500,
      active: true,
      category: "Bank",
      instructionTitle: null,
      instructionDetail:
        '<p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;">1. Screenshot barcode di web dan potong gambar sampai hanya menyisakan gambar barcodenya (atau download barcodenya)</p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">2. Masuk ke aplikasi BCA Mobile yang Anda gunakan, kemudian klik tombol </span><font color="#000000" style="font-family: inherit; font-size: 1rem; background-color: rgb(255, 255, 0);">QRIS</font></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">3. Setelah itu, klik icon Upload QR dari Galeri</span></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">4. Pilih gambar QRIS yang kamu Screenshot atau Download yang telah disimpan di Galeri</span></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">5. Klik OK untuk melanjutkan ke proses berikutnya</span></p><p style="border-color: rgba(229,231,235,var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;"><span style="font-family: inherit; font-size: 1rem;">6. Klik Bayar untuk menyelesaikan proses transaksi</span></p>',
      icon: {
        id: 74,
        name: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983614/c0qkvqbsz7qcyaaq4lxh.webp",
        path: "https://res.cloudinary.com/dqfouoru4/image/upload/v1716983614/c0qkvqbsz7qcyaaq4lxh.webp",
        isDelete: true,
      },
    },
  ],
  trxFeatures: [
    {
      id: 1,
      active: true,
      feature: {
        id: 1,
        name: "Jaminan Layanan",
        active: true,
      },
    },
    {
      id: 2,
      active: true,
      feature: {
        id: 2,
        name: "Layanan Pelanggan 24/7",
        active: true,
      },
    },
    {
      id: 3,
      active: true,
      feature: {
        id: 3,
        name: "Pembayaran yang Aman",
        active: true,
      },
    },
    {
      id: 4,
      active: true,
      feature: {
        id: 4,
        name: "Pengiriman Instant",
        active: true,
      },
    },
    {
      id: 5,
      active: true,
      feature: {
        id: 5,
        name: "Pengiriman Manual",
        active: true,
      },
    },
  ],
  data: "e1a0fbbe-2f1c-4884-a189-ddbc9acf053d",
};

const OrderDetail = () => {
  const { slug } = useParams();
  const uniqueCode = localStorage.getItem("unique-code")
    ? localStorage.getItem("unique-code")
    : null;
  // const { data: product } = useQuery({
  //   queryKey: ["product", slug, uniqueCode],
  //   queryFn: () => fetchProduct(slug, uniqueCode),
  //   staleTime: 21600000,
  // });

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mb-10">
      {product != null && (
        <>
          <CoverHeader data={product.product} features={product?.trxFeatures} />
          <div className="container relative w-full min-h-screen mx-auto lg:flex lg:gap-10">
            {/* <SideContent data={product.product} /> */}
            <DetailContent
              data={product.trxUserInputs}
              product={product.product}
              attributes={product.ffAttributes}
              myItems={product.myItems}
              payment={product.channels}
              token={product.data}
            />
          </div>

          <div
            className={`fixed flex items-center justify-center bottom-5 right-5 w-12 h-12 rounded-full bg-white ring-2 ring-orange-500 ring-offset-0 hover:ring-offset-4 hover:ring-offset-[#060911] transition-all duration-300 hover:cursor-pointer z-[100] ${
              showButton ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={scrollToTop}
          >
            <i className="bi bi-arrow-up-short text-3xl text-orange-500" />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
