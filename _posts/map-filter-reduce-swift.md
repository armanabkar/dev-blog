---
title: "Map, Filter und Reduce in Swift"
excerpt: "Höhere Funktionen wie 'map', 'filter', 'reduce', 'flatMap' und 'compactMap' für funktionale Programmierung."
coverImage: "/assets/blog/map-filter-reduce-swift/cover.webp"
date: "2024-08-14T05:35:07.322Z"
author:
  name: John Doe
  picture: "/assets/blog/authors/john.jpeg"
ogImage:
  url: "/assets/blog/map-filter-reduce-swift/cover.webp"
tags: ["Swift", "iOS", "iOS-Entwicklung", "Funktionale Programmierung"]
---

Swift verfügt, wie andere moderne Programmiersprachen, bereits über funktionale Features. In diesem Tutorial lernen wir eine davon kennen: höhere Funktionen, die uns helfen, **sauberen** und **leicht testbaren** Code zu schreiben. Aber was genau sind höhere Funktionen?

Höhere Funktionen sind Funktionen, die eine andere Funktion (oder Closure) als Argument entgegennehmen und sie gegebenenfalls als Ergebnis zurückliefern. Die Swift-Standardbibliothek enthält bereits mehrere davon, etwa `map`, `filter`, `reduce` (und auch `flatMap`, `compactMap` sowie `compactMapValues`), die den Code deutlich kürzer und prägnanter machen. Die meisten dieser Funktionen gibt es auch in anderen Programmiersprachen, sodass dieselben Begriffe dort ebenso gelten.

## map

Anstatt klassische `for-in`-Schleifen zu schreiben, benutzt man `map`, um eine Funktion auf jedes Element einer Kollektion (z. B. ein Array) anzuwenden und eine neues Array mit den Ergebnissen in derselben Reihenfolge zu erhalten.

Beispiel mit `for-in`:

```swift
let arrayOfNums = [2, 3, 4, 5, 6]
var newArr: [Int] = []
for num in arrayOfNums {
  newArr.append(num * 10)
}
print(newArr) // [20, 30, 40, 50, 60]
```

Mit `map` reicht eine einzige Zeile:

```swift
let newArrayUsingMap = arrayOfNums.map { $0 * 10 }
```

`map` funktioniert auch auf Dictionaries oder Sets. Das Ergebnis ist dann immer ein Array:

```swift
let dictionary = ["foo": 1, "bar": 2, "baz": 5]
let newDictionary = dictionary.map { name, value in value + 1 }
```

## filter

`filter` durchläuft eine Kollektion und liefert eine neue Kollektion nur mit den Elementen, für die die gegebene Bedingung `true` ergibt:

```swift
let numbers = [1, 4, 10, 15]
let oddNumbers = numbers.filter { $0 % 2 != 0 }
```

## reduce

`reduce` kombiniert alle Elemente einer Kollektion zu einem einzigen Wert, indem eine kombinierende Funktion angewendet wird:

```swift
let nums = [2.0, 4.0, 5.0]
var total = nums.reduce(10.0) { (result, el) in
  return result + el  // 21.0
}
total = nums.reduce(10.0, +)  // 21.0
```

## flatMap und compactMap

Diese Varianten von `map` flachen das Ergebnis ab oder entfernen `nil`-Werte.

`flatMap` wendet erst `map` an und flacht dann eine verschachtelte Kollektion (z. B. ein Array von Arrays) ab:

```swift
let nums = [[4, 3], [9, 6, 4], [2]]
let allNums = nums.flatMap { $0 }              // [4, 3, 9, 6, 4, 2]
let certainNums = nums.flatMap { $0.filter { $0 > 5 } }  // [9, 6]
```

In Swift 3 wurde `flatMap` auch genutzt, um `nil`-Werte zu entfernen. Das ist aber veraltet, und der Compiler warnt davor. Stattdessen verwendet man `compactMap`, das nur die nicht-nil-Ergebnisse liefert:

```swift
let compactMapCollection1: [Int] = [1, 2, nil, 4].compactMap { $0 }
// [1, 2, 4]
```

Seit Swift 5.0 gibt es `compactMapValues()` für Dictionaries. Es liefert ein neues Dictionary nur mit den Key-Value-Pairs, deren Werte nicht `nil` sind:

```swift
["2": "2", "3": nil, "4": "4"].compactMapValues { $0 }
// ["2": "2", "4": "4"]
```

`compactMapValues()` ist außerdem sicher zum Entpacken von Optionals, da Keys ohne Wert einfach wegfallen und das Programm nicht abstürzt.

## Verkettung (Chaining)

Mehrere höhere Funktionen lassen sich hintereinanderschalten. Jede Funktion läuft über die Kollektion und liefert eine neue Kollektion, auf die dann die nächste Funktion angewendet wird:

```swift
let nums = [4, 5, 8, 2, 9, 10]
let totalNums = nums
  .filter { $0 > 8 }
  .reduce(0, +)   // 19
```

## Performance

lineare Zeitkomplexität O(n), da jedes Element genau einmal besucht wird. Beim Verkettung mehrerer Funktionen iteriert jede Funktion erneut über das Ergebnis der Vorigen. In Performance-kritischen Situationen kann es daher sinnvoller sein, einen klassischen `for-in`-Loop zu verwenden, um alle Operationen in einem Durchgang zu erledigen.