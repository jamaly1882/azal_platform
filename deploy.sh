#!/usr/bin/env bash
# بناء ونشر موقع أزال سوفت على Firebase Hosting
#
# ملاحظة: الموقع صفحات ثابتة داخل مجلد web، ولا يحتاج إلى خطوة build.
# إن أردت معاينة آمنة قبل النشر النهائي، استخدم --preview.
set -euo pipefail
cd "$(dirname "$0")"

PROJECT="${FIREBASE_PROJECT:-azalplatfrm}"
MODE="${1:-deploy}"

command -v firebase >/dev/null || { echo "firebase CLI غير مثبت: npm i -g firebase-tools"; exit 1; }

case "$MODE" in
  preview)
    firebase hosting:channel:deploy preview --expires 7d --project "$PROJECT"
    ;;
  deploy)
    firebase deploy --only hosting --project "$PROJECT"
    ;;
  serve)
    firebase emulators:start --only hosting --project "$PROJECT"
    ;;
  *)
    echo "الاستخدام: ./deploy.sh [deploy|preview|serve]"; exit 2
    ;;
esac
