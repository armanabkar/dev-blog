---
title: "Invertieren eines Binärbaums in JavaScript"
excerpt: "LeetCode #226 Challenge: Gegeben ist ein Binärbaum. Schreibe einen Algorithmus, der den Baum invertiert und seine Wurzel zurückgibt."
coverImage: "/assets/blog/binary-tree/cover.webp"
date: "2025-03-10T05:35:07.322Z"
author:
  name: Arman
  picture: "/assets/blog/authors/arman.jpeg"
ogImage:
  url: "/assets/blog/binary-tree/cover.webp"
tags: ["JavaScript", "Binärbaums", "Algorithmen", "Fragen im Vorstellungsgespräch"]
---

[LeetCode #226 Challenge](https://leetcode.com/problems/invert-binary-tree/): Gegeben ist ein Binärbaum. Schreibe einen Algorithmus, der den Baum invertiert und seine Wurzel zurückgibt.

> Gegeben die Wurzel `root` eines Binärbaums: Invertiere den Baum und gib seine Wurzel zurück.

### Beispiel:  

![Invertieren eines Binärbaums in JavaScript](/assets/blog/binary-tree/binary-tree.webp)

LeetCode, 226. Invert Binary Tree, Beispiel 1  

```
Eingabe: root = [4,2,7,1,3,6,9]  
Ausgabe: [4,7,2,9,6,3,1]
```

Diese Aufgabe lässt sich effizient mit Rekursion lösen. Wir definieren eine Funktion, die die linken und rechten Teilbäume jedes Knotens vertauscht und sich dann rekursiv auf beide Teilbäume selbst aufruft. Dadurch wird der gesamte Baum durchlaufen und invertiert, sodass ein Spiegelbild entsteht.

Lösung:

```js
function invertTree(root) {
  if (root === null) return null;

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
}
```

1. Die Funktion prüft zunächst, ob der Baum leer ist (`root === null`), und gibt in diesem Fall null zurück, um die Rekursion zu beenden.  
2. Für jeden nicht-leeren Knoten werden die linken und rechten Kindknoten (`left` und `right`) vertauscht.  
3. Anschließend ruft sich die Funktion rekursiv auf den linken und rechten Teilbaum auf, um sicherzustellen, dass der gesamte Baum invertiert wird.

## Komplexitätsanalyse

**Zeitkomplexität**: **O(n)**, da jeder Knoten genau einmal besucht wird.
**Speicherkomplexität**: **O(h)** bei balancierten Bäumen, wobei h die Höhe des Baums ist. Dies liegt am Aufruf-Stack der Rekursion, dessen Tiefe proportional zur Höhe ist.
Im Worst-Case eines stark unausgeglichenen (schiefen) Baums kann die Speicherkomplexität O(n) erreichen, da der Aufruf-Stack entsprechend tief wird.