// hooks/useThemeColor.ts
import { Colors } from '@/constants/Colors'; //
// REMOVA a linha: import { useColorScheme } from '@/hooks/useColorScheme';
import { useTheme } from '@/context/ThemeContext'; // Ajuste este caminho se sua pasta se chamar 'context' (singular)
                                                 // Se 'contexts' está na raiz, e 'hooks' também, '../contexts/...' está correto.
                                                 // Se usa alias e 'contexts' está na raiz: '@/contexts/ThemeContext'

export function useThemeColor(
  props: { light?: string; dark?: string }, // Permite overrides de cor específicos por componente
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark // Chave de cor como 'text', 'background'
) {
  // Pega o appTheme ('light' ou 'dark') e o objeto de cores ativo (Colors.light ou Colors.dark)
  // do nosso ThemeContext.
  const { appTheme, colors } = useTheme();

  // Verifica se há um override de cor específico para o tema atual nos props do componente
  const colorFromProps = props[appTheme]; // props['light'] ou props['dark']

  if (colorFromProps) {
    return colorFromProps; // Usa o override se existir
  } else {
    // Caso contrário, usa a cor correspondente ao colorName do tema ativo (vindo do contexto)
    return colors[colorName];
  }
}