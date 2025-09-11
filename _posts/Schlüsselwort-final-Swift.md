---
title: "Das Schlüsselwort final in Swift"
excerpt: "Ein Schlüsselwort, das Vererbung verhindert und die Leistung verbessert."
coverImage: "/assets/blog/hello-world/cover.jpg"
date: "2025-02-17T05:35:07.322Z"
author:
  name: John Doe
  picture: "/assets/blog/authors/john.jpeg"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
---

Laut [offizieller Swift-Dokumentation](https://docs.swift.org/swift-book/LanguageGuide/Inheritance.html):

> A class can **inherit** methods, properties, and other characteristics from another class. When one class inherits from another, the inheriting class is known as a **subclass**, and the class it inherits from is known as its **superclass**. Inheritance is a fundamental behavior that differentiates classes from other types in Swift.

Einfaches Beispiel für Vererbung in Swift:

```swift
class Dog {
    let name: String
    init(name: String) {
        self.name = name
    }
    func bark() {
        print("\(name) bellt!")
    }
}

class Husky: Dog {
    func play() {
        print("\(name) spielt!")
    }
}

let jessie = Husky(name: "Jessie")
jessie.bark()
jessie.play()
```

Der **Husky** (Unterklasse) erbt alle Eigenschaften und Methoden von seiner Oberklasse (**Dog**) und hat zusätzlich eine neue Methode (**play**).

## Vererbung verhindern

objektorientierten Programmierung ist, möchte man manchmal verhindern, dass andere Entwickler:innen versehentlich Klassen oder Eigenschaften erben oder überschreiben.

Mit dem Schlüsselwort final kannst du die Vererbung blockieren:

```swift
final class Dog {
    let name: String
    init(name: String) {
        self.name = name
    }
    func bark() {
        print("\(name) bellt!")
    }
}
```

Wenn du versuchst, von der final-Klasse Dog zu erben, erhältst du in Xcode einen Fehler:

> ❗ Inheritance from a final class ‘Dog’

Du kannst **final** auch bei Funktionen verwenden, um zu verhindern, dass sie in einer Unterklasse überschrieben werden:

```swift
final func bark() { 
    print("\(name) bellt!")
}
```

> ❗ Instance method overrides a ‘final’ instance method

## Leistungsverbesserung

Laut [Apple Developer Documentation](https://developer.apple.com/swift/blog/?id=27):

> Like many other languages, Swift allows a class to override methods and properties declared in its superclasses. This means that the program has to determine at runtime which method or property is being referred to and then perform an indirect call or indirect access. This technique, called **dynamic dispatch**, increases language expressivity at the cost of a constant amount of runtime overhead for each indirect usage. In performance sensitive code such overhead is often undesirable.

Die Verwendung des Schlüsselworts **final** bei Klassen ermöglicht es dem Compiler, diese indirekten Aufrufe sicher zu vermeiden, was die Leistung verbessert. Je größer deine App ist, desto größer ist der Performance-Gewinn.