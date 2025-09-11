---
title: "Two-Sum-Problem in JavaScript"
excerpt: "LeetCode #1 Challenge: Gegeben ist ein Array von Zahlen und ein Zielwert (target). Gib die Indizes der beiden Zahlen zurück, deren Summe dem Zielwert entspricht."
coverImage: "/assets/blog/two-sum-javascript/cover.webp"
date: "2025-02-22T05:35:07.322Z"
author:
  name: Jane Doe
  picture: "/assets/blog/authors/jane.jpeg"
ogImage:
  url: "/assets/blog/two-sum-javascript/cover.webp"
---

[LeetCode #1 Challenge](https://leetcode.com/problems/two-sum/description/): Gegeben ist ein Array von Zahlen und ein Zielwert (`target`). Gib die Indizes der beiden Zahlen zurück, deren Summe dem Zielwert entspricht.

> Gegeben ist ein Array von ganzen Zahlen `nums` und eine ganze Zahl `target`. Gib die Indizes der beiden Zahlen zurück, deren Summe dem Zielwert entspricht.
>
> Du kannst davon ausgehen, dass es genau eine Lösung gibt und dass kein Element doppelt verwendet werden darf.  
>
> Die Antwort kann in beliebiger Reihenfolge zurückgegeben werden.

### Beispiele:

```
Eingabe: nums = [2,7,11,15], target = 9
Ausgabe: [0,1]
Erklärung: Da nums[0] + nums[1] == 9, geben wir [0, 1] zurück.
```

```
Eingabe: nums = [3,2,4], target = 6
Ausgabe: [1,2]
```

```
Eingabe: nums = [3,3], target = 6
Ausgabe: [0,1]
```

Wir müssen also einen Algorithmus schreiben, der die Indizes der beiden Elemente im Array zurückgibt, deren Summe dem Zielwert entspricht.  
In dieser Aufgabe nehmen wir an, dass es immer genau eine Lösung gibt.

## Die Brute-Force-Lösung

Diese Lösung ist in der Regel leicht zu implementieren und findet oft die richtige Antwort, indem sie jede mögliche Kombination ausprobiert.  
Allerdings kann sie sehr lange dauern und hat eine schlechte Zeit- und Speicherkomplexität.

Der Algorithmus nimmt das Array `nums` und durchläuft es mit verschachtelten Schleifen:

```javascript
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}
```

Selbst bei einem kleinen Array benötigt diese Methode viele Iterationen, um die Antwort zu finden.  
Die Zeitkomplexität beträgt **O(n²)** und wächst quadratisch mit der Größe des Arrays.

## Die lineare Lösung (Hash-Tabelle)

Zuerst initialisieren wir ein Dictionary namens `seen`.  
Dann durchlaufen wir das Array nur einmal und prüfen, ob es im Dictionary ein Element gibt, das zusammen mit dem aktuellen Element die Summe `target` ergibt:

```javascript
function twoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in seen) {
      return [seen[complement], i];
    }
    seen[nums[i]] = i;
  }
  return [];
}
```

Dieser Algorithmus benötigt deutlich weniger Iterationen und hat eine lineare Zeitkomplexität **O(n)**.  
Im schlimmsten Fall entspricht die Anzahl der Iterationen der Größe des Arrays.

Nachteil: Die Speicherkomplexität beträgt **O(n)**, da wir jedes Element im Dictionary speichern müssen.