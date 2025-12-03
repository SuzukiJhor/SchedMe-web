import { useEffect } from "react";

export function useMobileOnly() {
    useEffect(() => {
        const isMobile = () => {
            const mobileUA = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
            const smallScreen = window.innerWidth <= 768;
            return mobileUA && smallScreen;
        };

        if (!isMobile()) {
            document.body.innerHTML = `
        <div style="display:flex;height:100vh;align-items:center;justify-content:center;text-align:center;padding:20px;">
          <h2>Disponível apenas em dispositivos móveis 📱</h2>
          <p>Acesse pelo seu celular.</p>
        </div>`;
        }
    }, []);
}
