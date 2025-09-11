---
title: "String umkehren in Swift"
excerpt: "Schreibe eine Funktion, die einen String umkehrt."
coverImage: "/assets/blog/swift-reverse-string/cover.webp"
date: "2024-07-12T05:35:07.322Z"
author:
  name: Jane Doe
  picture: "/assets/blog/authors/jane.jpeg"
ogImage:
  url: "/assets/blog/swift-reverse-string/cover.webp"
---

[**LeetCode #344**](https://leetcode.com/problems/reverse-string/): Schreibe eine Funktion, die einen String umkehrt.

> Der Eingabestring wird als Array von Zeichen `s` übergeben.  
>
> Du musst dies tun, indem du das Eingabearray **in‑place** mit **O(1)** zusätzlichem Speicher veränderst.

**Beispiel:**  
```
Eingabe: s = ["h","e","l","l","o"]  
Ausgabe: ["o","l","l","e","h"]
```

Diese Aufgabe lässt sich zwar leicht mit einer eingebauten Methode lösen, aber es ist sinnvoller, zunächst verschiedene Ansätze und ihre Vor- und Nachteile zu besprechen.  
Schauen wir uns die Lösungen nacheinander an.

---

### 1. Zwei‑Zeiger‑Methode  
Wir benötigen zwei Zeiger: einen links und einen rechts. Dann vertauschen wir die Zeichen und bewegen die Zeiger (links +1, rechts −1), bis sie sich kreuzen:

```swift
func reverseString(_ s: inout [Character]) {
    var left = 0
    var right = s.count - 1
        
    while left < right {
        (s[left], s[right]) = (s[right], s[left])
        left += 1
        right -= 1
    }
}
```
**Zeitkomplexität:** O(n)

---

### 2. Rekursion  
In den meisten Fällen ist Rekursion nicht die effizienteste Lösung. Probleme, die sich rekursiv lösen lassen, haben fast immer auch eine iterative Alternative.  
Da wir hier jedoch die gängigsten Lösungen vorstellen, gehört die Rekursion dazu:

```swift
func reverseString(_ s: inout [Character]) {
    var count = s.count
        
    func reverseString(_ s: inout [Character], count: inout Int) {
        guard count > 0 else { return }

        if let last = s.popLast() {
            count -= 1
            s.insert(last, at: s.count - count)
            reverseString(&s, count: &count)
        }
    }
        
    reverseString(&s, count: &count)
}
```

Rekursive Funktionen sollten immer eine Abbruchbedingung haben, sonst kann es zu einem **Stack Overflow** kommen.  

**Zeitkomplexität:** O(n²)

---

### 3. Eingebaute Methoden  
Die Swift‑Standardbibliothek bietet zwei ähnliche Methoden, um ein Array umzukehren. Der Unterschied ist klein, aber wichtig:

```swift
func reverseString(_ s: inout [Character]) {    
    s.reverse() // Kehrt das Array in-place um
}

func reverseString(_ s: inout [Character]) {
    s = s.reversed() // Gibt ein neues umgekehrtes Array zurück
}
```
**Zeitkomplexität:** O(1)