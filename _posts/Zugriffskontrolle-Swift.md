---
title: "Zugriffskontrolle in Swift"
excerpt: "Beschränkt den Zugriff auf Teile deines Codes aus anderen Quelldateien und Modulen."
coverImage: "/assets/blog/zugriffskontrolle/cover.jpg"
date: "2024-11-22T05:35:07.322Z"
author:
  name: Arman
  picture: "/assets/blog/authors/arman.jpeg"
ogImage:
  url: "/assets/blog/zugriffskontrolle/cover.jpg"
---

Laut [offizieller Swift-Dokumentation](https://docs.swift.org/swift-book/LanguageGuide/AccessControl.html):

> Access control **restricts** access to parts of your code from code in other **source files** and **modules**. This feature enables you to hide the implementation details of your code and to specify a preferred interface through which that code can be accessed and used.

Swift bietet 5 verschiedene Zugriffsebenen, die auf nahezu alles angewendet werden können – z. B. Klassen, Strukturen (structs), Aufzählungen (enums), Protokolle, Eigenschaften, Funktionen, benutzerdefinierte Typen usw.

Schauen wir uns diese im Detail an:

### open

Dies ist die am wenigsten restriktive Zugriffsebene.  
Sie ermöglicht es, Klassen außerhalb ihres Moduls (target) zu subclassen und Methoden oder Eigenschaften zu überschreiben.

```swift
open class SomeOpenClass { ... }
```

### public

Dies ist ähnlich wie `open`, mit dem einzigen Unterschied, dass Vererbung oder Überschreiben nur innerhalb des Moduls möglich ist, in dem die Klasse definiert wurde.

```swift
public class SomePublicClass { ... }  
```

### internal

Dies ist der Standardzugriffslevel in Swift.  
Er erlaubt den Zugriff auf alle Entitäten innerhalb desselben Moduls, in dem sie definiert sind, jedoch nicht aus Quelldateien außerhalb dieses Moduls.  
Da internal der Standard ist, kann der Modifizierer weggelassen werden.

```swift
internal class SomeInternalClass { ... } // "internal" kann weggelassen werden
```

### fileprivate

Macht eine Deklaration nur innerhalb der gesamten Quelldatei (*.swift), in der sie definiert ist, sichtbar und verbirgt die Implementierung vor anderen Dateien desselben Moduls.

```swift
fileprivate class SomeFilePrivateClass { ... }
```

### private

Dies ist die restriktivste Zugriffsebene.  
Sie beschränkt den Zugriff auf die umschließende Deklaration und auf Erweiterungen (extensions) dieser Deklaration, sofern sie in derselben Datei liegen.  
Im Gegensatz zu `fileprivate` erlaubt private keinen Zugriff in einer Unterklasse.

```swift
private class SomePrivateClass { ... }
```

## Fazit

Es ist Best Practice, mit der restriktivsten Zugriffsebene zu beginnen und die Einschränkungen nur dann zu lockern, wenn es erforderlich ist.  
So begrenzen wir die Verbindungen zwischen verschiedenen Typen und Entitäten und verhindern unerwünschtes Verhalten.