# Giuseppe Manieri Autoservizi

## Netlify Forms (email notifications)
1. Pubblica il sito su Netlify con il build `npm run build` e `publish: dist`.
2. In Netlify vai su `Site settings` → `Forms` → `Form notifications`.
3. Aggiungi una nuova notifica email e inserisci `autoservizi.manierig@gmail.com`.
4. Salva e verifica che il form `preventivo` venga rilevato dopo un deploy.

## Aruba (.it) → Netlify DNS
1. Crea un nuovo sito in Netlify e collega il repository.
2. In Netlify vai su `Site settings` → `Domain management` e aggiungi il dominio `.it`.
3. Copia i nameserver Netlify assegnati.
4. Nel pannello Aruba aggiorna i nameserver del dominio con quelli di Netlify.
5. Attendi la propagazione DNS e verifica l'HTTPS attivo su Netlify.
